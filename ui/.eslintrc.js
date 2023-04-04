module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        project: './tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['react', 'import', '@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error'
    },
    overrides: [
        {
            files: ['**/*.ts?(x)'],
            rules: {
                'react/prop-types': 0,
                'react/require-default-props': 0
            }
        }
    ]
};
