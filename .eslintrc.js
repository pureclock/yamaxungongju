// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [2, "always"],  //语句强制分号结尾
    "eqeqeq": 0,
    "indent": [2, 4],   //缩进风格
    "spaced-comment": 0,     //注释风格要不要有空格什么的
    "no-redeclare": 0,    //禁止使用 var 多次声明同一变量
    "import/first": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "camelcase": 0,
    "space-before-function-paren": [2, "never"],  //函数定义时括号前面要不要有空格
    "no-mixed-spaces-and-tabs": [2, false],     //禁止混用tab和空格
    "no-spaced-func": 2,  //函数调用时 函数名与()之间不能有空格
    "one-var": [2, { "initialized": "never" }],  // 强制函数中的变量要么一起声明要么分开声明
    "no-unused-expressions": 0,          // 禁止出现未使用过的表达式
    "no-useless-escape": 0,// 禁用不必要的转义字符
    "one-var": 0,
    "no-mixed-operators": 0, // 禁止混合使用不同的操作符
    "no-array-constructor": 0, //禁止使用 Array 构造函数
    "prefer-promise-reject-errors": 0,
    "handle-callback-err": 0,
    "no-tabs": 0
  }
}
