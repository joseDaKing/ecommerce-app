import type { IdAttributes } from "../id/id-attributes";

export type PropertyAttributes = IdAttributes & {
    key: string;
    _parentId: string;
    valueString?: string;
    valueNumber?: number;
    valueBoolean?: boolean;
};
