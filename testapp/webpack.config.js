const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const webpackConfig = {
    mode: isProduction ? "production" : "development",
    bail: isProduction,
    context: path.join(__dirname),
    entry: {
        src: "./src/index.jsx",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "[name].[chunkhash:8].js",
    },
    resolve: {
        extensions: [".js", ".jsx"],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    optimization: {
        moduleIds: "named",
    },
    stats: {
        assetsSort: "!size",
        entrypoints: false,
    },
    devServer: {
        host: "0.0.0.0",
        port: 3123,
        compress: true,
        historyApiFallback: true,
        hot: true,
    }
};

module.exports = webpackConfig;