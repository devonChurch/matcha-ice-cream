const path = require("path");
const WebpackOnBuildPlugin = require("on-build-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const consola = require("consola").withScope("webpack");
const translate = require("./build");
const PRODUCTION_ENV = "production";
const { NODE_ENV = PRODUCTION_ENV } = process.env;
const isProduction = NODE_ENV === PRODUCTION_ENV;
const dirDist = path.resolve(__dirname, "dist");
const dirSrc = path.resolve(__dirname, "src");

consola.ready(`build configured for (${NODE_ENV})`);

module.exports = {
  mode: NODE_ENV,

  entry: "./src/",

  output: {
    path: dirDist,
    filename: "main.js"
  },

  devtool: isProduction ? "source-map" : "cheap-source-map",

  stats: isProduction ? "normal" : "errors-only",

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

    new WebpackOnBuildPlugin(() => {
      const developmentLangs = [
        { code: "en", label: "English" },
        { code: "ar", label: "Arabic" }
        // { code: "zh", label: "Chinese" },
        // { code: "fr", label: "French" },
        // { code: "de", label: "German" },
        // { code: "pt", label: "Portuguese" },
        // { code: "es", label: "Spanish" }
      ];
      const productionLangs = [
        ...developmentLangs,
        { code: "ar", label: "Arabic" },
        { code: "zh", label: "Chinese" },
        { code: "fr", label: "French" },
        { code: "de", label: "German" },
        { code: "pt", label: "Portuguese" },
        { code: "es", label: "Spanish" }
      ];
      const langs = isProduction ? productionLangs : developmentLangs;
      translate(langs);
    })
  ]
};
