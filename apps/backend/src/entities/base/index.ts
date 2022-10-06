import {
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from "typeorm";

import type { BaseAttributes } from "./base-attributes";

export abstract class Base extends BaseEntity implements BaseAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @CreateDateColumn()
    readonly createdAt!: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @DeleteDateColumn()
    readonly deletedAt?: Date;
}
