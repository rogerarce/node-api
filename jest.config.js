module.exports = {
    moduleFileExtensions: ['js','ts','json'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    transform: {'^.+\\.ts?$': 'ts-jest'},
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: -10
        }
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'src/config/',
        'src/api/middleware/auth.ts'
    ],
}