// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "陈永华的个人博客";
      return args;
    });
  }
};
