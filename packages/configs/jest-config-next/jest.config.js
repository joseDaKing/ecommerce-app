// @ts-check
const jestConfigBase = require("@org/jest-config-base");

/**
 * @type {any}
 */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: process.cwd(),
});

/**
 * @type {import("jest").Config}
 */
const jestConfig = {
    ...jestConfigBase,
    testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(jestConfig);
