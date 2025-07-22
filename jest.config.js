export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(.*\\.mjs$|react-router-dom|react|react-dom)/)",
  ],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "**/*.test.[jt]s?(x)"],
};
