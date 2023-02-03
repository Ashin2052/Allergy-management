module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // testPathIgnorePatterns: ['tests/integration', 'build'],
    modulePathIgnorePatterns: ['<rootDir>/src/tests/integration', '<rootDir>/dist'],
    testEnvironmentOptions: {
        NODE_ENV: 'DEV',
        APP_ENV: 'DEV',
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts', 'tests'],
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
}
