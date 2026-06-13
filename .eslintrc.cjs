module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'unused-imports',
        'import-quotes',
    ],
    rules: {
        'unused-imports/no-unused-imports': 'error',
        quotes: "off",
        "react/jsx-key": "off"
        // "unused-imports/no-unused-vars": [
        //     "warn",
        //     { "vars": "all", "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }
        // ],
        // "quotes": ["error", "double", { "avoidEscape": true }],
        // "quotes": "off",

        // // 2. ВКЛЮЧАЕМ двойные кавычки только для импортов (с автофиксом)
        // "import-quotes/import-quotes": ["error", "double"],

        // 3. ВКЛЮЧАЕМ одинарные кавычки для всего остального кода через селектор
        // Это замена стандартному правилу quotes, которая не трогает импорты
        // "no-restricted-syntax": [
        //     "error",
        //     {
        //         // Запрещаем двойные кавычки в обычных строках (Literal), 
        //         // но исключаем те, что внутри ImportDeclaration
        //         "selector": "VariableDeclaration Literal[value=/./][raw=/^\"/], ExpressionStatement Literal[value=/./][raw=/^\"/]",
        //         "message": "Используйте одинарные кавычки в коде."
        //     }
        // ],
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'max-len': 'off',
            },
        },
    ],
};
