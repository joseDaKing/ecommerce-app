export type TotalPriceAttributes = {
    totalPrice(): Promise<number>;
};

export type ItemPriceAttributes = {
    itemPrice(): Promise<number>;
};

export type LocationAttributes = {
    address: string;
    postCode: string;
    city: string;
    country: string;
};

export type DetailsAttributes = LocationAttributes & {
    firstName: string;
    lastName: string;
};
