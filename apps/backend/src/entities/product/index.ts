import { Base } from "../base";
import type { ProductAttributes } from "./product-attributes";
import { Entity, Column, OneToMany, ManyToOne, BeforeRemove } from "typeorm";
import type { ImageAttributes } from "../image/image-attributes";
import type { PropertyAttributes } from "../property/property-attributes";
import type { SchemaAttributes } from "../schema/schema-attributes";
import { Image } from "../image";
import { Property } from "../property";

@Entity()
export class Product extends Base implements ProductAttributes {
    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @OneToMany("Property", "id")
    properties!: Promise<PropertyAttributes[]>;

    @ManyToOne("Schema", "id", {
        nullable: false,
    })
    schema!: Promise<SchemaAttributes>;

    @OneToMany("Image", "id")
    images!: Promise<ImageAttributes[]>;

    @BeforeRemove()
    async _beforeRemove(): Promise<void> {
        const [images, properties] = await Promise.all([
            this.images,
            this.properties,
        ]);

        await Promise.all([Image.remove(images), Property.remove(properties)]);
    }
}
