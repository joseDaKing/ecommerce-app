import { list, graphql } from "@keystone-6/core";
import { text, password, virtual, relationship } from "@keystone-6/core/fields";
import type { Lists } from ".keystone/types";
import { timestampMixin } from "../mixins";
import {
    isEmailValidator,
    isStrongPasswordValidator,
    trimTransformer,
} from "../utilities";

export const user: Lists.user = list({
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
                resolve(item) {
                    return [item.email, item.createdAt?.toLocaleDateString()]
                        .filter(Boolean)
                        .join(" ");
                },
            }),
        }),
        email: text({
            isIndexed: "unique",
            validation: {
                isRequired: true,
            },
            hooks: {
                resolveInput: trimTransformer(),
                validateInput: isEmailValidator(),
            },
        }),
        password: password({
            validation: {
                isRequired: true,
            },
            hooks: {
                resolveInput: trimTransformer(),
                validateInput: isStrongPasswordValidator(),
            },
        }),
        orders: relationship({
            ref: "order.user",
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
