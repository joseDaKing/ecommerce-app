module.exports = {
    extends: "@org/eslint-config-base",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: [".eslintrc.js", "jest.config.js"],
            rules: {
                "unicorn/prefer-module": "off",
            },
        },
    ],
};
