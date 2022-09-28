import { text } from "@keystone-6/core/fields";
import { addressMixin } from "./address-mixin";

export const orderCredentialsMixin = () => ({
    firstName: text({
        validation: {
            isRequired: true,
        },
    }),
    lastName: text({
        validation: {
            isRequired: true,
        },
    }),
    ...addressMixin(),
});
