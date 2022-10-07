import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    Unique,
} from "typeorm";
import { Base } from "../base";
import type { ProductAttributes } from "../product/product-attributes";
import type { StockAttributes, StockItemAttributes } from "./stock-attributes";

@Entity()
@Unique(["stock", "product"])
export class StockItem extends Base implements StockItemAttributes {
    @Column()
    name!: string;

    @Column()
    amount!: number;

    @ManyToOne("Stock", "stockItems")
    stock!: Promise<StockAttributes>;

    @OneToOne("Product", "id")
    product!: Promise<ProductAttributes>;

    async itemPrice(): Promise<number> {
        const { price } = await this.product;

        return price;
    }

    isSoldOut(): boolean {
        return this.amount === 0;
    }
}

@Entity()
@Unique(["address", "postCode", "city", "country"])
export class Stock extends Base implements StockAttributes {
    @Column({ unique: true })
    name!: string;

    @Column()
    address!: string;

    @Column()
    postCode!: string;

    @Column()
    city!: string;

    @Column()
    country!: string;

    @OneToMany("StockItem", "stock")
    stockItems!: Promise<StockAttributes[]>;
}
