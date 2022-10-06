import type { BaseAttributes } from "../base/base-attributes";

export type ImageAttributes = BaseAttributes & {
    name: string;
    url: string;
    width: number;
    height: number;
};
