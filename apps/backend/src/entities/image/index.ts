import { Base } from "../base";
import type { ImageAttributes } from "./image-attributes";
import { Entity, Column } from "typeorm";

@Entity()
export class Image extends Base implements ImageAttributes {
    @Column({ unique: true })
    name!: string;

    @Column()
    readonly url!: string;

    @Column()
    readonly width!: number;

    @Column()
    readonly height!: number;
}
