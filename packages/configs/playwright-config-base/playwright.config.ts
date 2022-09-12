import type { PlaywrightTestConfig } from "@playwright/test";

export const playWrightTestConfig: PlaywrightTestConfig = {
    testMatch: "e2e/**/*.test.{ts,tsx}",
};
