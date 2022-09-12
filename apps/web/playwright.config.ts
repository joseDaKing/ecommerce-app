import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    testMatch: "e2e/**/*.test.{ts,tsx}",
};

export default config;
