module.exports = {
    extends: "@org/eslint-config-base",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
    },
    rules: {
        "unicorn/prefer-module": "off",
    },
};
