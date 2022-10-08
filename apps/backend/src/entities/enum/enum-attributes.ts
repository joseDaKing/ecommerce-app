import type { IdAttributes } from "../id/id-attributes";

export type EnumAttributes = IdAttributes & {
    name: string;
    enumValues: Promise<EnumValueAttributes[]>;
};

export type EnumValueAttributes = IdAttributes & {
    name: string;
    _parentId: string;
};
