import type { BaseEntity } from "typeorm";

export type IdAttributes = BaseEntity & {
    readonly id: string;
};
