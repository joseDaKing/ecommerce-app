import { graphql, list } from "@keystone-6/core";
import { checkbox, relationship, virtual } from "@keystone-6/core/fields";
import {
    addressMixin,
    archiveMixin,
    timestampMixin,
    archiveUiMixin,
} from "../mixins";
import type { Lists, Context } from ".keystone/types";
import type { ListHookArguments } from "../utilities";
import { isRelationshipDefinedValidator } from "../utilities";

export const order: Lists.order = list({
    fields: {
        name: virtual({
            ui: {
                itemView: {
                    fieldMode: "hidden",
                },
                createView: {
                    fieldMode: "hidden",
                },
            },
            field: graphql.field({
                type: graphql.String,
                async resolve(order, _, context: Context) {
                    const { userId, createdAt } = order;
                    const user = await context.db.user.findOne({
                        where: {
                            id: userId,
                        },
                    });

                    return [user?.email, createdAt?.toLocaleDateString()]
                        .filter(Boolean)
                        .join(" ");
                },
            }),
        }),
        totalPrice: virtual({
            field: graphql.field({
                type: graphql.Int,
                async resolve(order, _, context: Context) {
                    const orderItems = await context.query.orderItem.findMany({
                        where: {
                            order: {
                                id: {
                                    equals: order.id,
                                },
                            },
                        },
                        query: "totalPrice",
                    });

                    let totalPrice = 0;

                    for (const { totalPrice: orderItemPrice } of orderItems) {
                        totalPrice += orderItemPrice as number;
                    }

                    return totalPrice;
                },
            }),
        }),
        isProccessed: checkbox({
            defaultValue: false,
            ui: {
                createView: {
                    fieldMode: "hidden",
                },
            },
        }),
        user: relationship({
            ref: "user.orders",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
        ...addressMixin(),
        ...archiveMixin(),
        orderItems: relationship({
            ref: "orderItem.order",
            many: true,
        }),
        ...timestampMixin(),
    },
    ui: {
        ...archiveUiMixin(),
    },
    hooks: {
        afterOperation: removeAllRelatedOrderItems,
    },
});

async function removeAllRelatedOrderItems(
    arguments_: ListHookArguments<Lists.order.TypeInfo, "afterOperation">
) {
    const { originalItem, context, operation } = arguments_;

    if (operation === "delete") {
        const orders = await context.db.orderItem.findMany({
            where: {
                order: {
                    id: {
                        equals: originalItem.id,
                    },
                },
            },
        });

        const ids = orders.filter(({ id }) => id);

        const isEmpty = ids.length === 0;

        if (isEmpty) {
            return;
        }

        await context.db.orderItem.deleteMany({
            where: ids,
        });
    }
}
