import { timestamp } from "@keystone-6/core/fields";

export const timestampMixin = () => ({
    createdAt: timestamp({
        ui: {
            createView: {
                fieldMode: "hidden",
            },
            itemView: {
                fieldMode: "read",
            },
        },
        hooks: {
            resolveInput({ operation }) {
                if (operation === "create") {
                    return new Date();
                }
            },
        },
    }),
    updatedAt: timestamp({
        ui: {
            createView: {
                fieldMode: "hidden",
            },
            itemView: {
                fieldMode({ item }) {
                    const { updatedAt } = item;

                    if (updatedAt === null) {
                        return "hidden";
                    }

                    return "read";
                },
            },
        },
        hooks: {
            resolveInput({ operation }) {
                if (operation === "update") {
                    return new Date();
                }
            },
        },
    }),
});
