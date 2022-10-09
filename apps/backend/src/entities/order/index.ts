import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { Base } from "../base";
import type { CustomerAttributes } from "../customer/customer-attributes";
import { Id } from "../id";
import type { StockItemAttributes } from "../stock/stock-attributes";
import type { OrderAttributes, OrderItemAttributes } from "./order-attributes";

@Entity()
@Unique(["order", "stockItem"])
export class OrderItem extends Id implements OrderItemAttributes {
    @Column()
    amount!: number;

    @ManyToOne("Order", "orderItems")
    order!: Promise<OrderAttributes>;

    @ManyToOne("StockItem", "id")
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
export class Order extends Base implements OrderAttributes {
    @Column()
    address!: string;

    @Column()
    postCode!: string;

    @Column()
    city!: string;

    @Column()
    country!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @ManyToOne("Customer", "orders")
    customer!: Promise<CustomerAttributes>;

    @OneToMany("OrderItem", "order")
    orderItems!: Promise<OrderItemAttributes[]>;

    async totalPrice(): Promise<number> {
        const orderItems = await this.orderItems;

        const pricesPromise = orderItems.map(async (orderItem) =>
            orderItem.totalPrice()
        );

        const prices = await Promise.all(pricesPromise);

        let totalPrice = 0;

        for (const price of prices) {
            totalPrice += price;
        }

        return totalPrice;
    }
}
