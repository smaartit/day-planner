export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // use ts-jest for transforming TypeScript
  },
  moduleNameMapper: {
    "^react-big-calendar/lib/css/.*\\.css$": "identity-obj-proxy",
  },
};
