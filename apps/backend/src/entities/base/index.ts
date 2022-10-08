import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Id } from "../id";

import type { BaseAttributes } from "./base-attributes";

export abstract class Base extends Id implements BaseAttributes {
    @CreateDateColumn()
    readonly createdAt!: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @DeleteDateColumn()
    readonly deletedAt?: Date;
}
