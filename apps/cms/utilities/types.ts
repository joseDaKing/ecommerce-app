import type {
    FieldHooks,
    ListHooks,
} from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import type { MaybeItemFunction } from "@keystone-6/core/dist/declarations/src/types/config/lists";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

type FieldHook<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof FieldHooks<BaseListTypeInfo> = keyof FieldHooks<BaseListTypeInfo>
> = Exclude<FieldHooks<ListTypeInfo>[Hook], undefined>;

export type FieldHookArguments<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof FieldHooks<BaseListTypeInfo> = keyof FieldHooks<BaseListTypeInfo>
> = Parameters<FieldHook<ListTypeInfo, Hook>>[0];

type ListHook<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof ListHooks<BaseListTypeInfo> = keyof ListHooks<BaseListTypeInfo>
> = Exclude<ListHooks<ListTypeInfo>[Hook], undefined>;

export type ListHookArguments<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof ListHooks<BaseListTypeInfo> = keyof ListHooks<BaseListTypeInfo>
> = Parameters<ListHook<ListTypeInfo, Hook>>[0];

export type DefaultItemFieldModeArguments<
    ListTypeInfo extends BaseListTypeInfo = BaseListTypeInfo
> = Parameters<
    Exclude<MaybeItemFunction<"edit" | "read" | "hidden", ListTypeInfo>, string>
>[0];
