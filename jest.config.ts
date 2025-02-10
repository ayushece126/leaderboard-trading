import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"], // Points to your test folder
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Support for absolute imports if using @
  },
};

export default config;
