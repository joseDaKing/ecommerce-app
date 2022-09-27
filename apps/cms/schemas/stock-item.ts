import { graphql, list } from "@keystone-6/core";
import { integer, relationship, virtual } from "@keystone-6/core/fields";
import type { Lists, Context } from ".keystone/types";
import { timestampMixin } from "../mixins";
import type { ListHookArguments } from "../utilities";
import { isRelationshipDefinedValidator } from "../utilities";

export const stockItem: Lists.stockItem = list({
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
                async resolve(stockItem, _, context: Context) {
                    const { stockId, productId, createdAt } = stockItem;

                    const product = await context.db.product.findOne({
                        where: {
                            id: productId,
                        },
                    });

                    const stock = await context.db.stock.findOne({
                        where: {
                            id: stockId,
                        },
                    });

                    return [
                        product?.name,
                        stock?.name,
                        createdAt?.toLocaleDateString(),
                    ]
                        .filter(Boolean)
                        .join(" ");
                },
            }),
        }),
        amount: integer({
            validation: {
                isRequired: true,
                min: 0,
            },
        }),
        stock: relationship({
            ref: "stock.stockItems",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
        itemPrice: virtual({
            field: graphql.field({
                type: graphql.Int,
                async resolve(stockItem, _, context: Context) {
                    if (!stockItem.productId) {
                        return 0;
                    }

                    const product = await context.db.product.findOne({
                        where: {
                            id: stockItem.productId,
                        },
                    });

                    return Number(product?.price);
                },
            }),
        }),
        isSoldOut: virtual({
            field: graphql.field({
                type: graphql.Boolean,
                resolve(item) {
                    return item.amount === 0;
                },
            }),
        }),
        product: relationship({
            ref: "product.stockItems",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
        orderItems: relationship({
            ref: "orderItem.stockItem",
            many: true,
            ui: {
                linkToItem: true,
                itemView: {
                    fieldMode: "edit",
                },
                createView: {
                    fieldMode: "edit",
                },
            },
        }),
        ...timestampMixin(),
    },
    hooks: {
        validateInput: isUniqueValidator,
    },
});

async function isUniqueValidator(
    arguments_: ListHookArguments<Lists.stockItem.TypeInfo, "validateInput">
): Promise<void> {
    const { item, resolvedData, context, addValidationError } = arguments_;

    const stockId = resolvedData?.stock?.connect?.id ?? item?.stockId;

    const productId = resolvedData?.product?.connect?.id ?? item?.productId;

    if (!stockId || !productId) {
        return;
    }

    const stockItemResults = await context.db.stockItem.findMany({
        where: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            AND: [
                {
                    stock: {
                        id: {
                            equals: stockId,
                        },
                    },
                },
                {
                    product: {
                        id: {
                            equals: productId,
                        },
                    },
                },
            ],
        },
    });

    const isAlreadyExisting = stockItemResults.length > 0;

    const currentStockItemId = resolvedData?.id ?? item?.id;

    const [stockItem] = stockItemResults;

    const existingStockItemId = stockItem?.id;

    const isCurrentItem = currentStockItemId === existingStockItemId;

    if (isAlreadyExisting && !isCurrentItem) {
        addValidationError("Stock item already exists");
    }
}
