module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 标签需要自闭合
    "vue/html-self-closing": ["error", {
    "html": {
      // 类似 img 使用 />
      "void": "always",
      // 常规html元素绝不自闭合，比如 <p> 不能写成 <p />
      "normal": "never",
      "component": "always"
      },
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }]
  }
};
