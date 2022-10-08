import type { PropertyAttributes } from "./property-attributes";
import { Entity, Unique, Column } from "typeorm";
import { Id } from "../id";

@Entity()
@Unique(["key", "_parentId"])
export class Property extends Id implements PropertyAttributes {
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
