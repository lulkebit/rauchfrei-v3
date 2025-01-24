module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        // Allgemeine Regeln
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
        quotes: ['error', 'single'],
        semi: ['error', 'always'],

        // React spezifische Regeln
        'react/prop-types': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-unused-prop-types': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-key': 'error',
        'react/jsx-max-props-per-line': [
            'error',
            { maximum: 1, when: 'multiline' },
        ],
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never',
            },
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],

        // React Hooks Regeln
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Formatierung
        indent: ['error', 4],
        'max-len': [
            'error',
            {
                code: 100,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
    },
};
