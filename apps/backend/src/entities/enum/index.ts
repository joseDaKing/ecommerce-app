import { Base } from "../base";
import type { EnumAttributes, EnumValueAttributes } from "./enum-attributes";
import { Entity, Column, OneToMany } from "typeorm";

@Entity()
export class EnumValue extends Base implements EnumValueAttributes {
    @Column({ unique: true })
    name!: string;
}

@Entity()
export class Enum extends Base implements EnumAttributes {
    @Column()
    name!: string;

    @OneToMany("EnumValue", "id")
    enumValues!: Promise<EnumValueAttributes[]>;
}
