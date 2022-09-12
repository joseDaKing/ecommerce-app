module.exports = {
    extends: "@org/eslint-config-next",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: [".eslintrc.js", "next.config.js"],
            rules: {
                "unicorn/prefer-module": "off",
            },
        },
    ],
};
