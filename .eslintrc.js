module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'eslint-config-jitsi'
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
