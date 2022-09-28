import type { DefaultItemFieldModeArguments } from "utilities";

export const archiveUiMixin = () => ({
    itemView: {
        defaultFieldMode(arguments_: DefaultItemFieldModeArguments) {
            const { item } = arguments_;

            const { archived } = item;

            return archived ? "read" : "edit";
        },
    },
});
