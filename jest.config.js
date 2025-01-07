export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // use ts-jest for transforming TypeScript
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // Mocks CSS imports using identity-obj-proxy
  },
};
