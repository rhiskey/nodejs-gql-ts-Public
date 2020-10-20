const INDENT_SIZE = 2

module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'import/export': 'off',
    // disabled rules
    camelcase: 'warn',
    'no-alert': 'warn',
    'no-prototype-builtins': 'warn',
    'no-empty': 'warn',
    'no-console': 'warn',
    'no-debugger': 'error',
    'default-case': 'warn',
    'valid-jsdoc': 'off',
    'comma-dangle': ['warn', 'never'],
    'array-bracket-spacing': ['warn', 'never'],
    'default-param-last': 'warn',
    eqeqeq: 'warn',

    'import/prefer-default-export': 'off',

    // https://eslint.org/docs/rules/no-else-return
    'no-else-return': 'warn',
    // https://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': ['warn', { ignore: [1, -1, 0], ignoreArrayIndexes: true, enforceConst: true, detectObjects: true }],
    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': 'warn',
    // https://eslint.org/docs/rules/no-script-url
    'no-script-url': 'error',
    // https://eslint.org/docs/rules/no-sequences
    'no-sequences': 'warn',
    // https://eslint.org/docs/rules/no-useless-catch
    'no-useless-catch': 'warn',
    // https://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'warn',
    'no-return-assign': 'error',
    'dot-location': ['warn', 'property'],
    'array-callback-return': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-unused-expressions': 0,
    'class-methods-use-this': 'off',
    // warning rules
    'import/no-cycle': 'warn',
    'template-curly-spacing': ['warn', 'never'],

    // Stylistic issues
    // https://eslint.org/docs/rules/#stylistic-issues

    // https://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['error', { before: false, after: true }],
    // https://eslint.org/docs/rules/indent
    indent: 'off',
    '@typescript-eslint/indent': ['warn', INDENT_SIZE, {
      SwitchCase: 1,
      VariableDeclarator: 'first',
      MemberExpression: 1,
      ArrayExpression: 1,
      FunctionDeclaration: { parameters: 'first' },
      FunctionExpression: { parameters: 'first' },
      CallExpression: { arguments: 'first' },
      ObjectExpression: 1,
      ImportDeclaration: 1
    }],
    // https://eslint.org/docs/rules/key-spacing
    'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    // https://eslint.org/docs/rules/linebreak-style
    // 'linebreak-style': ['error', 'unix'],
    // https://eslint.org/docs/rules/lines-between-class-members
    'lines-between-class-members': ['error', 'always'],
    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': 'warn',
    // https://eslint.org/docs/rules/padding-line-between-statements
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'do' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: 'let', next: '*' },
      { blankLine: 'always', prev: 'var', next: '*' },
      { blankLine: 'any', prev: '*', next: 'const' },
      { blankLine: 'any', prev: '*', next: 'let' },
      { blankLine: 'any', prev: '*', next: 'var' }
    ],
    // https://eslint.org/docs/rules/prefer-object-spread
    'prefer-object-spread': 'warn',
    // https://eslint.org/docs/rules/quotes
    quotes: ['warn', 'single'],
    yoda: 'warn'
  },
  parserOptions: {
    // В качестве парсер используем `@typescript-eslint/parser` вместо `babel-eslint`
    // и вот тут написано почему:
    // https://github.com/typescript-eslint/typescript-eslint#what-about-babel-and-babel-eslint
    parser: '@typescript-eslint/parser'
  }
}
