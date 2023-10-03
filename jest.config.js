/* eslint @typescript-eslint/no-var-requires: "off" */
const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './'
})
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: './jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.(test).(ts|tsx)'],
  moduleNameMapper: {
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
    '^@/components': '<rootDir>/src/view/components'
  }
}
module.exports = createJestConfig(customJestConfig)
