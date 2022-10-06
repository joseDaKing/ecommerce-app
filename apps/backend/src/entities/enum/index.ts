import { Base } from "../base";
import type { EnumAttributes, EnumValueAttributes } from "./enum-attributes";
import { Entity, Column, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(["name", "_parentId"])
export class EnumValue extends Base implements EnumValueAttributes {
    @Column({ unique: true })
    name!: string;

    @Column()
    _parentId!: string;
}

@Entity()
export class Enum extends Base implements EnumAttributes {
    @Column()
    name!: string;

    @OneToMany("EnumValue", "id")
    enumValues!: Promise<EnumValueAttributes[]>;
}
