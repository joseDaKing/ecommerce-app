import { graphql, list } from "@keystone-6/core";
import { checkbox, relationship, virtual } from "@keystone-6/core/fields";
import { addressMixin, archiveMixin, timestampMixin } from "../mixins";
import type { Lists, Context } from ".keystone/types";
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
        itemView: {
            defaultFieldMode(arguments_) {
                const { item } = arguments_;

                const { archived } = item;

                return archived ? "read" : "edit";
            },
        },
    },
});
