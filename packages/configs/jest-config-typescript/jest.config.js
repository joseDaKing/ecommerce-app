const jestConfigBase = require("@org/jest-config-base");

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
    ...jestConfigBase,
    preset: "ts-jest",
    testEnvironment: "node",
};
