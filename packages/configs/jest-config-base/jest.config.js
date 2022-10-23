/**
 * @type {import("jest").Config}
 */
const jestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    bail: true,
    cache: true,
};

module.exports = jestConfig;
