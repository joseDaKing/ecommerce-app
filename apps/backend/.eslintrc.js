module.exports = {
    extends: "@org/eslint-config-next",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: [
                ".eslintrc.js",
                "next.config.js",
                "jest.unit.config.js",
                "jest.e2e.config.js",
            ],
            rules: {
                "unicorn/prefer-module": "off",
            },
        },
        {
            files: "*.ts",
            rules: {
                "new-cap": "off",
            },
        },
    ],
};
