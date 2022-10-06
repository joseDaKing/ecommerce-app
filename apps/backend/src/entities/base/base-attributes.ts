import type { BaseEntity } from "typeorm";

export type BaseAttributes = BaseEntity & {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt?: Date;
    readonly deletedAt?: Date;
};
