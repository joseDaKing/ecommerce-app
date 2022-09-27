import { list, graphql } from "@keystone-6/core";
import { integer, relationship, virtual } from "@keystone-6/core/fields";
import type { Lists, Context } from ".keystone/types";
import { timestampMixin } from "../mixins";
import type { ListHookArguments } from "../utilities";
import { isRelationshipDefinedValidator } from "../utilities";

export const orderItem: Lists.orderItem = list({
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
                async resolve(orderItem, _, context: Context) {
                    const { orderId, stockItemId, createdAt } = orderItem;

                    const [order, stockItem] = await Promise.all([
                        context.db.order.findOne({
                            where: {
                                id: orderId,
                            },
                        }),
                        context.db.stockItem.findOne({
                            where: {
                                id: stockItemId,
                            },
                        }),
                    ]);

                    const [user, product] = await Promise.all([
                        context.db.user.findOne({
                            where: {
                                id: order?.userId,
                            },
                        }),
                        context.db.product.findOne({
                            where: {
                                id: stockItem?.productId,
                            },
                        }),
                    ]);

                    return [
                        user?.email,
                        product?.name,
                        createdAt?.toLocaleDateString(),
                    ]
                        .filter(Boolean)
                        .join(" ");
                },
            }),
        }),
        totalPrice: virtual({
            field: graphql.field({
                type: graphql.Int,
                async resolve(orderItem, _, context: Context) {
                    if (!orderItem.stockItemId) {
                        return 0;
                    }

                    const { itemPrice } = await context.query.stockItem.findOne(
                        {
                            where: {
                                id: orderItem.stockItemId,
                            },
                            query: "itemPrice",
                        }
                    );

                    return (itemPrice as number) * orderItem.amount;
                },
            }),
        }),
        amount: integer({
            validation: {
                isRequired: true,
                min: 1,
            },
        }),
        itemPrice: virtual({
            field: graphql.field({
                type: graphql.Int,
                async resolve(orderItem, _, context: Context) {
                    if (!orderItem.stockItemId) {
                        return 0;
                    }

                    const { itemPrice } = await context.query.stockItem.findOne(
                        {
                            where: {
                                id: orderItem.stockItemId,
                            },
                            query: "itemPrice",
                        }
                    );

                    return itemPrice as number;
                },
            }),
        }),
        order: relationship({
            ref: "order.orderItems",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
        stockItem: relationship({
            ref: "stockItem.orderItems",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
        ...timestampMixin(),
    },
    hooks: {
        async validateInput(arguments_) {
            await validateUnique(arguments_);
        },
    },
    ui: {
        itemView: {
            async defaultFieldMode(arguments_) {
                const { item, context } = arguments_;

                const { orderId } = item;

                const order = await context.db.order.findOne({
                    where: {
                        id: orderId,
                    },
                });

                if (order?.archived) {
                    return "read";
                }

                return "edit";
            },
        },
    },
});

async function validateUnique(
    arguments_: ListHookArguments<Lists.orderItem.TypeInfo, "validateInput">
): Promise<void> {
    const { item, resolvedData, context, addValidationError } = arguments_;

    const orderId = resolvedData?.order?.connect?.id ?? item?.orderId;

    const stockItemId =
        resolvedData?.stockItem?.connect?.id ?? item?.stockItemId;

    const orderItemResults = await context.db.orderItem.findMany({
        where: {
            order: {
                id: {
                    equals: orderId,
                },
            },
            stockItem: {
                id: {
                    equals: stockItemId,
                },
            },
        },
    });

    const isAlreadyExisting = orderItemResults.length > 0;

    const currentOrderItemId = resolvedData?.id ?? item?.id;

    const [stockItem] = orderItemResults;

    const existingOrderItemId = stockItem?.id;

    const isCurrentItem = currentOrderItemId === existingOrderItemId;

    if (isAlreadyExisting && !isCurrentItem) {
        addValidationError("Order item already exists");
    }
}
