import { Base } from "../base";
import type { PropertyAttributes } from "./property-attributes";
import { Entity, Unique, Column } from "typeorm";

@Entity()
@Unique(["key", "_parentId"])
export class Property extends Base implements PropertyAttributes {
    @Column()
    key!: string;

    @Column()
    _parentId!: string;

    @Column()
    valueString?: string;

    @Column()
    valueNumber?: number;

    @Column()
    valueBoolean?: boolean;
}
