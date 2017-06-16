/**
 * @file RocketBroom webpack 2 config.
 * @author Alice Klipper <alice.klipper@yandex.com> (https://vk.com/alice.klipper)
 * @license MIT
 * @copyright KlipperSubs, 2017
 * @flow
 */

/*
 eslint
 no-magic-numbers: off,
 import/no-extraneous-dependencies: off,
 import/no-commonjs: off,
 import/unambiguous: off,
 fp/no-mutation: off,
 import/max-dependencies: off,
 security/detect-object-injection: off,
 fp/no-let: off,
 no-param-reassign: off
 */

/* Import builtin modules */
const { join } = require('path');

/* Import webpack */
const webpack = require('webpack');

/* Import webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const NotifierPlugin = require('webpack-notifier');
const DashboardPlugin = require('webpack-dashboard/plugin');

/* Import other helpers */
const { dev } = require('alice-helpers');

/* Define shortcuts for some webpack plugins */
const { EnvironmentPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;

/*
 * Config options
 */

/* Target configuration */
const target = () => 'web';

/* Context configuration */
const context = () => process.cwd();

/* Entry point configuration */
const entry = () => ({
    index: ['babel-polyfill', './src/index.jsx'],
});

/* Output configuration */
const output = () => ({
    chunkFilename: '[id].js',
    filename: '[name].js',
    path: join(process.cwd(), 'build'),
    pathinfo: dev(),
    publicPath: process.env.PUBLIC_PATH,
});

/* Source maps configuration */
const devtool = () => (dev() ? 'source-map' : undefined);

/* Development server configuration */
const devServer = () => ({
    compress: false,
    port: process.env.PORT,
    host: process.env.HOST,
    historyApiFallback: true,
    publicPath: process.env.PUBLIC_PATH,
    contentBase: join(process.cwd(), 'build'),
    watchContentBase: true,
    hot: false,
    // open: dev(),
});

/* Watch configuration */
const watch = () => false;

/* Node-like environment configuration */
const node = () => ({
    __filename: true,
    __dirname: true,
    global: true,
    process: true,
    Buffer: true,
    setImmediate: true,
});

/* Resolving configurations */
const resolve = () => ({
    extensions: ['.jsx', '.js', '.json'],
    alias: {
        '~': join(process.cwd(), 'src'),
    },
});

/*
 * Plugins
 */

const envPlugin = () => {
    return new EnvironmentPlugin({
        NODE_ENV: 'development',
        PORT: 1337,
        HOST: 'localhost',
    });
};

const htmlPlugin = () => {
    return new HtmlWebpackPlugin({
        inject: false,
        template: '!pug-loader!./index.pug',
        title: 'Pizda',
        appMountId: 'mount',
        mobile: true,
    });
};

const namedPlugin = () => (dev() ? new NamedModulesPlugin() : null);

const errorsPlugin = () => (dev() ? new NoEmitOnErrorsPlugin() : null);

const babiliPlugin = () => (dev() ? null : new BabiliPlugin());

const compressionPlugin = () => (dev() ? null : new CompressionPlugin());

const analyzerPlugin = () =>
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        defaultSizes: dev() ? 'stat' : 'gzip',
        openAnalyzer: false,
        logLevel: 'silent',
    });

const notifierPlugin = () =>
    new NotifierPlugin({
        alwaysNotify: true,
        title: 'webpack',
    });

const dashboardPlugin = () => new DashboardPlugin({ port: parseInt(process.env.PORT) + 1 });

/*
 * Rules
 */

const jsonRule = () => ({
    test: /\.json$/,
    exclude: /node_modules/,
    use: [{ loader: 'json-loader' }],
});

const fileRule = () => ({
    test: /\.(?:png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/,
    exclude: /node_modules/,
    use: [{ loader: 'file-loader' }],
});

const jsRule = () => ({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
        },
        {
            loader: 'eslint-loader',
            options: {
                emitError: true,
                fix: true,
            },
        },
    ].filter(Boolean),
});

/*
 * Generate and export config
 */

module.exports = [
    {
        target: target(),
        context: context(),
        entry: entry(),
        output: output(),
        devtool: devtool(),
        devServer: devServer(),
        watch: watch(),
        node: node(),
        resolve: resolve(),
        plugins: [
            envPlugin(),
            htmlPlugin(),
            namedPlugin(),
            errorsPlugin(),
            babiliPlugin(),
            compressionPlugin(),
            analyzerPlugin(),
            notifierPlugin(),
            dashboardPlugin(),
        ].filter(Boolean),
        module: { rules: [jsonRule(), fileRule(), jsRule()] },
    },
].filter(Boolean);
