var path = require("path");
const { webpack } = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "static", "frontend"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    optimization: {
        minimize: true
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    },
    //devtool: "source-map" //-- dev only
    devtool: false,
};
