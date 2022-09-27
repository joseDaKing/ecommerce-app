import { text } from "@keystone-6/core/fields";
import { trimTransformer } from "../utilities";

export const addressMixin = () => ({
    address: text({
        validation: {
            isRequired: true,
        },
        hooks: {
            resolveInput: trimTransformer(),
        },
    }),
    zipCode: text({
        validation: {
            isRequired: true,
        },
        hooks: {
            resolveInput: trimTransformer(),
        },
    }),
    country: text({
        validation: {
            isRequired: true,
        },
        hooks: {
            resolveInput: trimTransformer(),
        },
    }),
});
