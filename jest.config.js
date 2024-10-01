/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      lines: 80, // Set a global line coverage threshold
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/index.ts"],
};
