var path = require("path");
const { webpack } = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "static", "frontend"),
        filename: "bundle.js"
    },
    module: {
        rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
    },
    optimization: {
        minimize: true
    },
    devtool: "source-map"
};
