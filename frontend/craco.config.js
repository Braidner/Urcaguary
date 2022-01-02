const {} = require("@craco/craco");
const path = require('path');

module.exports = {
    devServer: {
        hot: true,
        // open: true,
        hotOnly: true,
        port: 3001,
        publicPath: "/",
        writeToDisk: true,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8080',
                port: 8080,
                secure: false,
                // auth: 'test-tkp-admin:123qwe!@#QWE',
                changeOrigin: true,
            },
            '/auth/*': {
                target: 'http://127.0.0.1:8080',
                port: 8080,
                secure: false,
                // auth: 'test-tkp-admin:123qwe!@#QWE',
                changeOrigin: true,
            },
            '/version': {
                target: 'http://127.0.0.1:8080',
                port: 8080,
                secure: false,
                // auth: 'test-tkp-admin:123qwe!@#QWE',
                changeOrigin: true,
            }
        }
    },
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            paths.appBuild = webpackConfig.output.path = path.resolve('build');
            return webpackConfig
        }
    }
};