const jestConfigTypescript = require("@org/jest-config-typescript");

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
    ...jestConfigTypescript,
    testPathIgnorePatterns: ["e2e"],
    testMatch: ["**/*.test.{js,ts}"],
};
