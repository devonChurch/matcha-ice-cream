const path = require("path");
const WebpackOnBuildPlugin = require("on-build-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const translate = require("./build");
const PRODUCTION_ENV = "production";
const { NODE_ENV = PRODUCTION_ENV } = process.env;
const isProduction = NODE_ENV === PRODUCTION_ENV;
const dirDist = path.resolve(__dirname, "dist");
const dirSrc = path.resolve(__dirname, "src");

console.log(`node environment = "${NODE_ENV}"`);

module.exports = {
  mode: NODE_ENV,

  entry: "./src/",

  output: {
    path: dirDist,
    filename: "main.js"
  },

  devtool: isProduction ? "source-map" : "cheap-source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        include: dirSrc,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(dirDist),

    new WebpackOnBuildPlugin(function(stats) {
      console.log("*** DONE ***");
      console.log("\n\n");
      // console.log(JSON.stringify(stats, null, 2));
      console.log(stats);
      console.log("\n\n");
      const langs = isProduction ? ["en"] : ["en"];
      translate(langs);
    })
  ]
};
