import type { BaseAttributes } from "../base/base-attributes";
import type { EnumAttributes } from "../enum/enum-attributes";
import type { IdAttributes } from "../id/id-attributes";

export type SchemaAttributes = BaseAttributes & {
    name: string;
    schemaProperties: Promise<SchemaPropertyAttributes[]>;
};

export type SchemaPropertyAttributes = IdAttributes & {
    key: string;
    _parentId: string;
    type: "string" | "integer" | "decimal" | "boolean" | "enum";
    enum?: Promise<EnumAttributes>;
};
