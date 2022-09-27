import type { FieldHookArguments } from "./types";
import type { BaseListTypeInfo } from "@keystone-6/core/types";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import kebabCase from "lodash.kebabcase";
import capitalize from "lodash.capitalize";

export const isEmailValidator = createValidator(
    isEmail,
    (fieldName) => `${fieldName} must be an email`
);

export const isStrongPasswordValidator = createValidator(
    isStrongPassword,
    (fieldName) =>
        [
            `${fieldName} must be a password that is`,
            "at least 8 characters long",
            "include one uppercase",
            "include one lowercase",
            "include one number",
            "include one symbol",
        ].join(", ")
);

type Validator = (input: string, options?: any) => boolean;

function createValidator<T extends Validator>(
    validator: T,
    message: string | ((fieldName: string) => string)
) {
    return (options?: Parameters<T>["1"]) => {
        const validationInputHook = (
            arguments_: FieldHookArguments<BaseListTypeInfo, "validateInput">
        ) => {
            const { fieldKey, item, resolvedData, addValidationError } =
                arguments_;

            const fieldValue: unknown =
                resolvedData?.[fieldKey] ?? item?.[fieldKey];

            if (typeof fieldValue !== "string") {
                return;
            }

            if (!validator(fieldValue, options)) {
                if (typeof message === "function") {
                    const fieldName = toFieldName(fieldKey);

                    message = message(fieldName);
                }

                addValidationError(message);
            }
        };

        return validationInputHook;
    };
}

export function isRelationshipDefinedValidator() {
    const validationInputHook = (
        arguments_: FieldHookArguments<BaseListTypeInfo, "validateInput">
        // eslint-disable-next-line unicorn/consistent-function-scoping
    ): void => {
        const { resolvedData, item, addValidationError, fieldKey } = arguments_;

        const relationShip: unknown =
            resolvedData?.[fieldKey]?.connect?.id ?? item?.[`${fieldKey}Id`];

        if (!relationShip) {
            const fieldName = toFieldName(fieldKey);

            addValidationError(`${fieldName} field is required`);
        }
    };

    return validationInputHook;
}

export function isImageFieldDefined() {
    const validationInputHook = (
        arguments_: FieldHookArguments<BaseListTypeInfo, "validateInput">
        // eslint-disable-next-line unicorn/consistent-function-scoping
    ) => {
        const { item, fieldKey, resolvedData, addValidationError } = arguments_;

        const imageId: unknown =
            resolvedData?.[fieldKey].id ?? item?.[`${fieldKey}_id`];

        if (!imageId) {
            addValidationError(`${toFieldName(fieldKey)} field is required`);
        }
    };

    return validationInputHook;
}

function toFieldName(value: string): string {
    return capitalize(kebabCase(value).split("-").join(" "));
}
