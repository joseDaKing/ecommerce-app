export type Values<Type> = Type[keyof Type];

export type PickFieldByType<Type, KeyType> = Values<{
    [Field in keyof Type]: Type[Field] extends KeyType ? Field : never;
}>;

export type PickByType<Type, KeyType> = Pick<
    Type,
    PickFieldByType<Type, KeyType>
>;

export type OmitFieldByType<Type, KeyType> = Exclude<
    keyof Type,
    PickFieldByType<Type, KeyType>
>;

export type OmitByType<Type, KeyType> = Omit<
    Type,
    PickFieldByType<Type, KeyType>
>;
