import type { CustomerAttributes } from "../customer/customer-attributes";
import type { BaseAttributes } from "../base/base-attributes";
import type { StockItemAttributes } from "../stock/stock-attributes";
import type {
    AmountAttributes,
    DetailsAttributes,
    ItemPriceAttributes,
    TotalPriceAttributes,
} from "../types";
import type { IdAttributes } from "../id/id-attributes";

export type OrderAttributes = BaseAttributes &
    DetailsAttributes &
    TotalPriceAttributes & {
        customer: Promise<CustomerAttributes>;
        orderItems: Promise<OrderItemAttributes[]>;
    };

export type OrderItemAttributes = IdAttributes &
    TotalPriceAttributes &
    ItemPriceAttributes &
    AmountAttributes & {
        order: Promise<OrderAttributes>;
        stockItem: Promise<StockItemAttributes>;
    };
