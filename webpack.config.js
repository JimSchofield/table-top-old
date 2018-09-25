const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Clean = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const CopyPlugin = new CopyWebpackPlugin(
    [{
        from: 'src/assets/images/*.*',
        to: './'
    }]
);

module.exports = {
    entry: "./src/scripts/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        // new Clean(['dist']),
        new MiniCssExtractPlugin(),
        CopyPlugin,
        // new HtmlWebpackPlugin({
            //     title: 'TableTop'
            // }),
        ],
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    mode: "development"
};
