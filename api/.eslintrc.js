module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'prettier'
    ],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    root: false,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': [
            'off'
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error'
        ],
        '@typescript-eslint/explicit-module-boundary-types': [
            'off'
        ],
        '@typescript-eslint/no-explicit-any': [
            'off'
        ],
        '@typescript-eslint/no-return-await': [
            'error'
        ],
        'no-return-await': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn'
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'variable',
                'format': [
                    'camelCase',
                    'UPPER_CASE'
                ]
            }
        ],
        "@typescript-eslint/no-array-constructor": [
            "error"
        ],
        "@typescript-eslint/no-base-to-string": [
            "error"
        ],
        "@typescript-eslint/no-dupe-class-members": [
            "error"
        ],
        "@typescript-eslint/no-dynamic-delete": [
            "off"
        ],
        "@typescript-eslint/no-empty-function": [
            "off"
        ],
        "@typescript-eslint/no-empty-interface": [
            "error"
        ],
        "@typescript-eslint/no-extra-non-null-assertion": [
            "error"
        ],
        "@typescript-eslint/no-invalid-this": [
            "error"
        ],
        "@typescript-eslint/no-invalid-void-type": [
            "error"
        ],
        "@typescript-eslint/no-misused-new": [
            "error"
        ],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksVoidReturn": false
            }
        ],
        "@typescript-eslint/no-require-imports": [
            "error"
        ],
        "@typescript-eslint/no-throw-literal": [
            "error"
        ],
        "@typescript-eslint/no-type-alias": [
            "off"
        ],
        "@typescript-eslint/no-unnecessary-type-arguments": [
            "error"
        ],
        "@typescript-eslint/no-unnecessary-type-assertion": [
            "error"
        ],
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
    },
};
