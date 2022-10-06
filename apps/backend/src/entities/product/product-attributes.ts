import type { BaseAttributes } from "../base/base-attributes";
import type { SchemaAttributes } from "../schema/schema-attributes";
import type { ImageAttributes } from "../image/image-attributes";
import type { PropertyAttributes } from "../property/property-attributes";

export type ProductAttributes = BaseAttributes & {
    name: string;
    description: string;
    price: number;
    properties: Promise<PropertyAttributes[]>;
    images: Promise<ImageAttributes[]>;
    schema: Promise<SchemaAttributes>;
};
