const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const apiMocker = require("connect-api-mocker");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, path.resolve(__dirname, "config")],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/transform-runtime"],
        },
      },
      {
        test: /\.(scss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "./public"),
    port: 3000,
    inline: true,
    hot: true,
    before: (app) => {
      app.use(apiMocker("/api", "/mocks"));
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new SourceMapDevToolPlugin(),
    new webpack.BannerPlugin({ banner: new Date().toLocaleDateString() }),
    new ESLintPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "./src/assets/images",
    //       to: "./assets/images",
    //     },
    //     {
    //       from: "./config",
    //       to: "./config",
    //     },
    //   ],
    // }),
    new webpack.DefinePlugin({
      IMAGE_PATH: JSON.stringify("./assets/images"),
    }),
  ],
  resolve: {
    alias: {
      "@style": path.resolve(__dirname, "src/assets/scss"),
    },
  },
};
