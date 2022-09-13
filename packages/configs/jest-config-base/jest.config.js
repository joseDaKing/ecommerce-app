// @ts-check

/**
 * @type {import("jest").Config}
 */
const jestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    bail: true,
    cache: true,
    testPathIgnorePatterns: ["e2e"],
    testMatch: ["**/*.test.{js,ts,jsx,tsx}"],
};

module.exports = jestConfig;
