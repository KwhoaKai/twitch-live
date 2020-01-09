module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  // 1
  entry: "./src/index.js",
  // use babel-loader on .js files, excluding node_modules folder
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },

  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devtool: "source-map",
  // 2
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  // 3
  devServer: {
    contentBase: "./dist"
  }
};

/* Use src/index.js file as entry point to bundle, imports
	other JS files to bundle too

   Bundled source code results in bundle.js file in /dist folder

   /dist folder used to serve application to browsers


   build automatically generates ./dist/index.html file from ./src/index.html template
  */
