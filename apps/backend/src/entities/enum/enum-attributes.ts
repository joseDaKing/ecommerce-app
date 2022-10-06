import type { BaseAttributes } from "../base/base-attributes";

export type EnumAttributes = BaseAttributes & {
    name: string;
    enumValues: Promise<EnumValueAttributes[]>;
};

export type EnumValueAttributes = BaseAttributes & {
    name: string;
};
