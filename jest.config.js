/* eslint @typescript-eslint/no-var-requires: "off" */
const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './'
})
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/tests/**/*.(test).(ts|tsx)'],
  moduleNameMapper: {
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/view/(.*)$': '<rootDir>/src/view/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1'
    // '^@/components/(.*)$': '<rootDir>/components/$1',
  }
}
module.exports = createJestConfig(customJestConfig)
