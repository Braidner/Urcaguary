const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bundle: ['@babel/polyfill', './src/app.tsx'],
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js'
    },
    devtool: PROD ? false : 'inline-source-map',
    devServer: {
        hot: true,
        open: true,
        hotOnly: true,
        port: 3000,
        publicPath: "/",
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8080',
                port: 8080,
                secure: false,
                auth: 'test-tkp-admin:123qwe!@#QWE',
                changeOrigin: true,
            }
        }
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,},
            {test: /\.js.?$/, use: ["babel-loader?cacheDirectory"], exclude: /node_modules/},
            {test: /\.less/, use: ["style-loader", "css-loader", {
                    loader: "less-loader", options: {
                        modifyVars: {
                            'link-color': '#337ab7',
                            'text-color': '#333',
                            'primary-color': '#337ab7',
                            'font-family': 'sans-serif',
                            'table-row-hover-bg': '#f1f1f1 !important',
                        },
                        javascriptEnabled: true,
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.less', '.ts', '.tsx'],
    },
    // optimization: {
    //     minimizer: true,
    // },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
        new HtmlWebPackPlugin({
            template: "./index.html"
        }),
        // new BundleAnalyzerPlugin(),
    ]
};
