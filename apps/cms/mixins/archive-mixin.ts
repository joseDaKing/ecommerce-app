import { checkbox } from "@keystone-6/core/fields";

export const archiveMixin = () => ({
    archived: checkbox({
        defaultValue: false,
        ui: {
            createView: {
                fieldMode: "hidden",
            },
            itemView: {
                fieldMode: "edit",
            },
        },
    }),
});
