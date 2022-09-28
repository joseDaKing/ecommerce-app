import { graphql, list } from "@keystone-6/core";
import {
    image as imageField,
    relationship,
    virtual,
} from "@keystone-6/core/fields";
import {
    isImageFieldDefined,
    isRelationshipDefinedValidator,
} from "../utilities";
import type { Lists, Context } from ".keystone/types";

export const image: Lists.image = list({
    fields: {
        name: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(imageItem, _, context: Context) {
                    const { productId, image_id: imageId } = imageItem;

                    const product = await context.db.product.findOne({
                        where: {
                            id: productId,
                        },
                    });

                    return [product?.name, imageId].filter(Boolean).join(" ");
                },
            }),
        }),
        image: imageField({
            storage: "imageStorage",
            hooks: {
                validateInput: isImageFieldDefined(),
            },
        }),
        product: relationship({
            ref: "product.images",
            many: false,
            hooks: {
                validateInput: isRelationshipDefinedValidator(),
            },
        }),
    },
});
