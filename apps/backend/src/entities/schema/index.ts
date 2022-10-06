import { Base } from "../base";
import type {
    SchemaAttributes,
    SchemaPropertyAttributes,
} from "./schema-attributes";
import { Entity, Unique, Column, OneToMany, ManyToOne } from "typeorm";
import type { EnumAttributes } from "../enum/enum-attributes";

@Entity()
@Unique(["key", "_parentId"])
export class SchemaProperty extends Base implements SchemaPropertyAttributes {
    @Column()
    key!: string;

    @Column()
    _parentId!: string;

    @Column()
    type!: "string" | "boolean" | "enum" | "integer" | "decimal";

    @ManyToOne("Enum", "id", { nullable: false })
    enum?: Promise<EnumAttributes>;
}

@Entity()
export class Schema extends Base implements SchemaAttributes {
    @Column()
    name!: string;

    @OneToMany("SchemaProperty", "id")
    schemaProperties!: Promise<SchemaPropertyAttributes[]>;
}
