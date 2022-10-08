import type { BaseEntity } from "typeorm";
import type { IdAttributes } from "../id/id-attributes";

export type BaseAttributes = BaseEntity &
    IdAttributes & {
        readonly createdAt: Date;
        readonly updatedAt?: Date;
        readonly deletedAt?: Date;
    };
