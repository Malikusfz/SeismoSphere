module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
