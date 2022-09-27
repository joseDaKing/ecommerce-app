import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { trimTransformer } from "../utilities";
import { addressMixin, timestampMixin } from "../mixins";
import type { Lists } from ".keystone/types";

export const stock: Lists.stock = list({
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
        ...addressMixin(),
        stockItems: relationship({
            ref: "stockItem.stock",
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
});
