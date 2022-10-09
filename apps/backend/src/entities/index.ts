import { DataSource } from "typeorm";
import { Customer } from "./customer";
import { Enum } from "./enum";
import { Image } from "./image";
import { Order } from "./order";
import { Product } from "./product";
import { Property } from "./property";
import { Schema } from "./schema";
import { Stock } from "./stock";

export const database = new DataSource({
    type: "sqlite",
    database: "database.db",
    entities: [Customer, Enum, Image, Order, Product, Property, Schema, Stock],
});

export { Customer } from "./customer";
export { Enum } from "./enum";
export { Image } from "./image";
export { Order } from "./order";
export { Product } from "./product";
export { Property } from "./property";
export { Schema } from "./schema";
export { Stock } from "./stock";
