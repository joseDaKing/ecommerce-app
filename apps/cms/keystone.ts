import { config } from "@keystone-6/core";

import * as lists from "./schemas";

export default config({
    server: {
        port: 3001,
    },
    db: {
        provider: "sqlite",
        url: "file:./keystone.db",
    },
    storage: {
        imageStorage: {
            kind: "local",
            type: "image",
            generateUrl: (path) => `http://localhost:3001/images${path}`,
            serverRoute: {
                path: "/images",
            },
            storagePath: "public/images",
        },
    },
    lists,
});
