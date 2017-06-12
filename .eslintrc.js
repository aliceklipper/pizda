/* eslint no-magic-numbers: 'off' */

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'google',
        'plugin:flowtype/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/strict',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
    ],
    plugins: ['flowtype', 'react', 'prettier', 'graphql', 'babel', 'jsx-a11y'],
    rules: {
        'no-cond-assign': 'error',
        'no-console': 'off',
        'no-irregular-whitespace': 'off',
        'no-unsafe-negation': 'error',
        'valid-jsdoc': [
            'error',
            {
                requireParamDescription: false,
                requireReturnDescription: false,
                requireReturn: false,
                prefer: {
                    returns: 'return',
                },
            },
        ],
        'class-methods-use-this': 'error',
        complexity: 'error',
        'dot-notation': [
            'error',
            {
                allowKeywords: true,
            },
        ],
        eqeqeq: 'error',
        'no-alert': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-magic-numbers': [
            'error',
            {
                ignore: [1],
                enforceConst: true,
                detectObjects: true,
            },
        ],
        'no-new-func': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        yoda: 'error',

        'no-catch-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-shadow': 'error',
        'no-unused-vars': [
            'error',
            {
                args: 'none',
            },
        ],
        'no-use-before-define': 'error',

        camelcase: 'error',
        'linebreak-style': 'error',
        'lines-around-comment': [
            'error',
            {
                beforeBlockComment: true,
                afterBlockComment: false,
                beforeLineComment: false,
                afterLineComment: false,
                allowBlockStart: true,
                allowBlockEnd: false,
                allowObjectStart: true,
                allowObjectEnd: false,
                allowArrayStart: true,
                allowArrayEnd: false,
            },
        ],
        'max-depth': ['error', 4],
        'max-lines': [
            'error',
            {
                max: 300,
                skipBlankLines: true,
                skipComments: true,
            },
        ],
        'max-nested-callbacks': ['error', 3],
        'max-params': ['error', 5],
        'max-statements-per-line': 'error',
        'max-statements': ['error', 10],
        'newline-after-var': 'error',
        'newline-before-return': 'error',
        'no-continue': 'error',
        'no-nested-ternary': 'error',
        'no-plusplus': 'error', // All hail Immutability!
        'no-unneeded-ternary': [
            'error',
            {
                defaultAssignment: false,
            },
        ],
        'operator-assignment': 'error',

        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': [
            'error',
            {
                array: true,
                object: true,
            },
            {
                enforceForRenamedProperties: true,
            },
        ],
        'prefer-numeric-literals': 'error',
        'prefer-template': 'error',
        'symbol-description': 'error',

        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-unknown-property': 'error',
        'react/prefer-stateless-function': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': 'error',
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',

        'react/jsx-boolean-value': 'error',
        'react/jsx-handler-names': 'error',
        'react/jsx-no-literals': 'off', // TODO: Change to `'error'` when i18n library will be written.

        'flowtype/no-types-missing-file-annotation': 'off',

        'new-cap': 'off',
        'babel/new-cap': 'error',
        'no-invalid-this': 'off',
        'babel/no-invalid-this': 'off',
        semi: 'off',
        'babel/semi': 'error',

        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                printWidth: 160,
                tabWidth: 4,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                parser: 'flow',
                semi: true,
            },
        ],

        // 'graphql/template-strings': [
        //     'error',
        //     {
        //         env: 'relay',
        //         schemaJson: require('./schema.json'),
        //     }],

        'require-jsdoc': 'off',
    },
};
