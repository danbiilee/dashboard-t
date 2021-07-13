const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|jpe?g|gif|ico)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            outputPath: "images",
            name: "[name].[contenthash].[ext]",
          },
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "fonts",
            name: "[name].[contenthash].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/config",
          to: "./config",
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /\.config\.js$/,
        extractComments: false,
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    // splitChunks: {
    //   chunks: "all",
    // },
  },
});
