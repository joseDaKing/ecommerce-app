import type { BaseListTypeInfo } from "@keystone-6/core/types";
import type { FieldHookArguments } from "./types";

export const trimTransformer = () => {
    const resolveInputHook = (
        arguments_: FieldHookArguments<BaseListTypeInfo, "resolveInput">
        // eslint-disable-next-line unicorn/consistent-function-scoping
    ) => {
        const { fieldKey, item, resolvedData } = arguments_;

        const fieldValue: unknown =
            resolvedData?.[fieldKey] ?? item?.[fieldKey];

        if (!fieldValue) {
            return;
        }

        if (typeof fieldValue !== "string") {
            return;
        }

        return fieldValue.trim();
    };

    return resolveInputHook;
};
