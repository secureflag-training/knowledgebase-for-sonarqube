const webpack = require("webpack");
const config = require("./webpack.config");

module.exports = {
  ...config,
  mode: 'development',
  output: {
    ...config.output,
    publicPath: '/static/secureflag'
  },
  watch: true,
  devtool: 'source-map',
  devServer: {
    devMiddleware: {
      index: false, // specify to enable root proxying
    },
    // proxy expects sonarqube on 9000,
    // it intercepts the request to grab the
    // static frontend file from the local
    // system
    proxy: [
      {
        context: ["/static"],
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
        router: {
          '/secureflag': 'http://localhost:8080'
        }
      },
      {
        context: () => true,
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
