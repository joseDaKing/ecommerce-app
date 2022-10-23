/* eslint-disable unicorn/prevent-abbreviations */
const jestConfigTypescript = require("@org/jest-config-typescript");

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
    ...jestConfigTypescript,
    testPathIgnorePatterns: [],
    testMatch: ["**/e2e/**/*.test.{js,ts}"],
};
