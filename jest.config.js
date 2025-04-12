export default {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            useESM: true,
            tsconfig: 'tsconfig.json',
        }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/mocks/fileMock.js',
        'react-lazy-load-image-component/src/effects/blur.css': '<rootDir>/src/mocks/fileMock.js',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/mocks/fileMock.js',
        '^react-lazy-load-image-component$': '<rootDir>/src/mocks/fileMock.js'
    },
    modulePaths: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!(@mui/material|@mui/icons-material|uuid|react-redux|react-lazy-load-image-component)/)'
    ],
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons'],
    }
}; 