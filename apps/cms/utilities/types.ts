import type {
    FieldHooks,
    ListHooks,
} from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export type FieldHook<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof FieldHooks<BaseListTypeInfo> = keyof FieldHooks<BaseListTypeInfo>
> = Exclude<FieldHooks<ListTypeInfo>[Hook], undefined>;

export type FieldHookArguments<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof FieldHooks<BaseListTypeInfo> = keyof FieldHooks<BaseListTypeInfo>
> = Parameters<FieldHook<ListTypeInfo, Hook>>[0];

export type ListHook<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof ListHooks<BaseListTypeInfo> = keyof ListHooks<BaseListTypeInfo>
> = Exclude<ListHooks<ListTypeInfo>[Hook], undefined>;

export type ListHookArguments<
    ListTypeInfo extends BaseListTypeInfo,
    Hook extends keyof ListHooks<BaseListTypeInfo> = keyof ListHooks<BaseListTypeInfo>
> = Parameters<ListHook<ListTypeInfo, Hook>>[0];
