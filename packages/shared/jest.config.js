const jestConfigTypescript = require("@org/jest-config-typescript");

/**
 * @type {import('ts-jest/dist/types').InitialOptionsTsJest}
 */
module.exports = {
    ...jestConfigTypescript,
    testMatch: ["**/*.test.{js,ts,jsx,tsx}"],
};
