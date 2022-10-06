import type { BaseAttributes } from "../base/base-attributes";

export type PropertyAttributes = BaseAttributes & {
    key: string;
    _parentId: string;
    valueString?: string;
    valueNumber?: number;
    valueBoolean?: boolean;
};
