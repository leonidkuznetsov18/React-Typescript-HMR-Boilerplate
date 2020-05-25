module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        "es6": true,
        "browser": true,
        "jest": true
    },
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
    ],
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "jest",
        "prettier"
    ],
    rules: { // Rules for javascript and typescript
        "no-underscore-dangle": 0,
        "no-prototype-builtins": 0,

        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,

        "react/jsx-filename-extension": [
            2,
            {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        ],
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-closing-tag-location": 0,
        "react/jsx-curly-newline": 0,
        "react/jsx-curly-spacing": 0,
        "react/jsx-equals-spacing": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-max-props-per-line": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-props-no-multi-spaces": 0,
        "react/jsx-tag-spacing": 0,
        "react/jsx-wrap-multilines": 0,
        "react/jsx-props-no-spreading": 1,
        "react/jsx-no-bind": 0,
        "react/button-has-type": 0,
        "react/display-name": 0,
        "react/destructuring-assignment": 1,

        "import/prefer-default-export": 0,
        "import/extensions": [
            2,
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],

        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/triple-slash-reference": 0,



        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 0,
    },
    settings: {
        "import/resolver": {
            "node": {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        },
        react: {
            version: "detect"
        }
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    overrides: [
        {
            "files": ["**/*.ts?(x)"],
            "rules": {}
        }
    ]
};
