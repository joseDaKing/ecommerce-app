import { Base } from "../base";
import type {
    SchemaAttributes,
    SchemaPropertyAttributes,
} from "./schema-attributes";
import {
    Entity,
    Unique,
    Column,
    OneToMany,
    ManyToOne,
    BeforeRemove,
} from "typeorm";
import type { EnumAttributes } from "../enum/enum-attributes";
import { Id } from "../id";

@Entity()
@Unique(["key", "_parentId"])
export class SchemaProperty extends Id implements SchemaPropertyAttributes {
    @Column()
    key!: string;

    @Column()
    _parentId!: string;

    @Column()
    type!: "string" | "boolean" | "enum" | "integer" | "decimal";

    @ManyToOne("Enum", "id")
    enum?: Promise<EnumAttributes>;
}

@Entity()
export class Schema extends Base implements SchemaAttributes {
    @Column()
    name!: string;

    @OneToMany("SchemaProperty", "id")
    schemaProperties!: Promise<SchemaPropertyAttributes[]>;

    @BeforeRemove()
    async _beforeRemove(): Promise<void> {
        const schemaProperties = await this.schemaProperties;

        await SchemaProperty.remove(schemaProperties);
    }
}
