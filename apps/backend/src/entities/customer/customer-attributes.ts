import type { BaseAttributes } from "../base/base-attributes";
import type { IdAttributes } from "../id/id-attributes";
import type { OrderAttributes } from "../order/order-attributes";
import type { StockItemAttributes } from "../stock/stock-attributes";
import type {
    AmountAttributes,
    ItemPriceAttributes,
    TotalPriceAttributes,
} from "../types";

export type CustomerAttributes = BaseAttributes &
    TotalPriceAttributes & {
        email: string;
        password: string;
        orders: Promise<OrderAttributes[]>;
        shoppingCartItems: Promise<ShoppingCartItemAttributes[]>;
    };

export type ShoppingCartItemAttributes = IdAttributes &
    TotalPriceAttributes &
    ItemPriceAttributes &
    AmountAttributes & {
        customer: Promise<CustomerAttributes>;
        stockItem: Promise<StockItemAttributes>;
    };
