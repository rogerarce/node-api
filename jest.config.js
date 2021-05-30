module.exports = {
    moduleFileExtensions: [
        'js',
        'ts',
        'json'
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        // '**/?(*.)+(spec|test).js?(x)'
        '**/?(*.)+(spec|test).ts?(x)',
    ],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }

}