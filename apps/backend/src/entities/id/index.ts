import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import type { IdAttributes } from "./id-attributes";

export class Id extends BaseEntity implements IdAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
}
