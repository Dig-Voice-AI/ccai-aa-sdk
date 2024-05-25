// eslint.config.js
import js from "@eslint/js"
import globals from 'globals'

export default [
    js.configs.recommended,
    {
        ignores: ["dist"]
    },
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser
            },
            ecmaVersion: 'latest',
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        },
    }
]