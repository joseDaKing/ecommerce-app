import type { BaseEntity } from "typeorm";
import type { ProductAttributes } from "../product/product-attributes";
import type { ItemPriceAttributes, LocationAttributes } from "../types";

export type StockAttributes = BaseEntity &
    LocationAttributes & {
        name: string;
        stockItems: Promise<StockAttributes[]>;
    };

export type StockItemAttributes = BaseEntity &
    ItemPriceAttributes & {
        name: string;
        amount: number;
        stock: Promise<StockAttributes>;
        product: Promise<ProductAttributes>;
        isSoldOut(): boolean;
    };
