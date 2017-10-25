module.exports = {
    'extends': [
        'eslint-config-jitsi',
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'plugins': [
        'react'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'rules': {
        'no-console': 0
    }
};
