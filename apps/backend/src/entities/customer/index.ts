import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base";
import { Id } from "../id";
import type { OrderAttributes } from "../order/order-attributes";
import type { StockItemAttributes } from "../stock/stock-attributes";
import type {
    CustomerAttributes,
    ShoppingCartItemAttributes,
} from "./customer-attributes";

export class ShoppingCartItems
    extends Id
    implements ShoppingCartItemAttributes
{
    @Column()
    amount!: number;

    @ManyToOne("Customer", "id")
    customer!: Promise<CustomerAttributes>;

    @ManyToOne("StockIten", "id")
    stockItem!: Promise<StockItemAttributes>;

    async totalPrice(): Promise<number> {
        return this.amount * (await this.itemPrice());
    }

    async itemPrice(): Promise<number> {
        const { itemPrice } = await this.stockItem;

        return itemPrice();
    }
}

@Entity()
export class Customer extends Base implements CustomerAttributes {
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @OneToMany("Order", "customer")
    orders!: Promise<OrderAttributes[]>;

    @OneToMany("ShoppingCartItem", "id")
    shoppingCartItems!: Promise<ShoppingCartItemAttributes[]>;

    async totalPrice(): Promise<number> {
        const shoppingCartItems = await this.shoppingCartItems;

        const totalPricePromises = shoppingCartItems.map(
            async (shoppingCartItem) => shoppingCartItem.totalPrice()
        );

        const totalPrices = await Promise.all(totalPricePromises);

        let totalShoppingCartPrice = 0;

        for (const totalPrice of totalPrices) {
            totalShoppingCartPrice += totalPrice;
        }

        return totalShoppingCartPrice;
    }
}
