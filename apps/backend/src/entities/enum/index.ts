import type { EnumAttributes, EnumValueAttributes } from "./enum-attributes";
import { Entity, Column, OneToMany, Unique, BeforeRemove } from "typeorm";
import { Id } from "../id";

@Entity()
@Unique(["name", "_parentId"])
export class EnumValue extends Id implements EnumValueAttributes {
    @Column({ unique: true })
    name!: string;

    @Column()
    _parentId!: string;
}

@Entity()
export class Enum extends Id implements EnumAttributes {
    @Column()
    name!: string;

    @OneToMany("EnumValue", "id")
    enumValues!: Promise<EnumValueAttributes[]>;

    @BeforeRemove()
    async _beforeRemove(): Promise<void> {
        const enumValues = await this.enumValues;

        await EnumValue.remove(enumValues);
    }
}
