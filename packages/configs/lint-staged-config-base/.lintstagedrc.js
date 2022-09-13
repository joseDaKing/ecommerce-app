module.exports = {
    "*.json": "npx prettier",
    "*.{js,jsx}": "npx eslint",
    "*.{ts,tsx}": "tsc-files --no-emit",
    "*.test.ts": ["npx jest", "npx playwright test"],
};
