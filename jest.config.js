/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  rootDir: ".",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};
