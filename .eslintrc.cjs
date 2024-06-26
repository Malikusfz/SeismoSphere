module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true, // Add jest environment
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'spellcheck',
    ],
    rules: {
        'no-console': 'off',
        'spellcheck/spell-checker': 'off', // Disable the spell checker
        'max-len': 'off',
        'default-param-last': 'off',
        'no-underscore-dangle': ['error', { allow: ['_map'] }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.js',
                    '**/*.spec.js',
                    '**/test/**',
                    'src/components/**/*.test.jsx', // Include test files in components folder
                ],
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'react/prop-types': 'error',
        'react/jsx-props-no-spreading': 'off',
    },
};
