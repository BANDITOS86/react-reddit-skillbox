/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./setupTestsEnzymeAdapter.tsx", "<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css)": "identity-obj-proxy"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  // testEnvironment: 'jest-environment-jsdom'
};




