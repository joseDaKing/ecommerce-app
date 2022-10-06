import {
    BaseEntity,
    Column,
    Unique,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from "typeorm";

type BaseAttributes = BaseEntity & {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
};

export type CustomerAttributes = BaseAttributes & {
    email: string;
    password: string;
};

@Entity()
@Unique(["email"])
export class Customer extends BaseEntity implements CustomerAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt = new Date();

    @UpdateDateColumn()
    updatedAt?: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
