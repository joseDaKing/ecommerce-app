import { list } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";
import { trimTransformer } from "../utilities";
import { timestampMixin } from "../mixins";
import type { Lists } from ".keystone/types";

export const product: Lists.product = list({
    fields: {
        name: text({
            isIndexed: "unique",
            validation: {
                isRequired: true,
            },
            hooks: {
                resolveInput: trimTransformer(),
            },
        }),
        description: text({
            validation: {
                isRequired: true,
            },
            ui: {
                displayMode: "textarea",
            },
            hooks: {
                resolveInput: trimTransformer(),
            },
        }),
        price: integer({
            validation: {
                isRequired: true,
                min: 1,
            },
        }),
        stockItems: relationship({
            ref: "stockItem.product",
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
        images: relationship({
            ref: "image.product",
            many: true,
        }),
        ...timestampMixin(),
    },
});
