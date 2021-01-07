("use strict");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const DEV = process.env.NODE_ENV !== "production";

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const path = require("path");
const port = process.env.port || process.env.npm_config_port || 9527; // dev port
function resolve(dir) {
  return path.join(__dirname, dir);
}
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://127.0.0.1:3000/", // 本地代理地址
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉路径中开头的'/api'
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "陈永华的博客";
      return args;
    });
    if (!DEV) {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions, //所有匹配此{RegExp}的资产都会被处理
          threshold: 512, // 只处理大于此大小的资产。以字节为单位
          minRatio: 0.8, //只有压缩好这个比率的资产才能被处理
          deleteOriginalAssets: false //是否删除原资源
        })
      );
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    ],
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": resolve("src/utils/antdIcon.js")
      }
    }
  }
};
