const path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(j|t)s?$/,
        exclude: [/node_modules/, path.resolve(__dirname, "config")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/transform-runtime"],
          },
        },
      },
    ],
  },
};
