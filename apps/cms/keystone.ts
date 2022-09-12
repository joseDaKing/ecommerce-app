import { config, list } from "@keystone-6/core";
import { text, integer } from "@keystone-6/core/fields";

export default config({
    server: {
        port: 3001,
    },
    db: {
        provider: "sqlite",
        url: "file:./keystone.db",
    },
    lists: {
        user: list({
            fields: {
                name: text(),
                age: integer(),
            },
        }),
    },
});
