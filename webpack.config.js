/**
 * @file RocketBroom webpack 2 (3) config.
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
 no-param-reassign: off,
 security/detect-non-literal-fs-filename: off,
 promise/prefer-await-to-callbacks: off,
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

const BuildPlugin = require('@aliceklipper/build-number-plugin');

/* Define shortcuts for some webpack plugins */
const { EnvironmentPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;

/* Preparing */
const dev = !process.env.NODE_ENV || process.env.NODE_ENV.startsWith('dev');
// const prod = (process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod')) || false;

/*
 * Config options
 */

/* Target configuration */
const target = 'web';

/* Context configuration */
const context = process.cwd();

/* Entry point configuration */
const entry = {
    index: ['babel-polyfill', './src/index.jsx'],
};

const externals = {
    version: '__VERSION__',
};

/* Output configuration */
const output = {
    chunkFilename: '[id].js',
    filename: '[name].js',
    path: join(process.cwd(), 'build'),
    pathinfo: dev,
    publicPath: process.env.PUBLIC_PATH,
};

/* Source maps configuration */
const devtool = dev ? 'source-map' : undefined;

/* Development server configuration */
const devServer = {
    compress: false,
    port: process.env.PORT,
    host: process.env.HOST,
    historyApiFallback: true,
    publicPath: process.env.PUBLIC_PATH,
    contentBase: join(process.cwd(), 'build'),
    watchContentBase: true,
    hot: false,
    // open: dev,
};

/* Watch configuration */
const watch = false;

/* Node-like environment configuration */
const node = {
    __filename: true,
    __dirname: true,
    global: true,
    process: true,
    Buffer: true,
    setImmediate: true,
};

/* Resolving configurations */
const resolve = {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
        '~': join(process.cwd(), 'src'),
        types: join(process.cwd(), 'src', 'types'),
        cc: join(process.cwd(), 'src', 'const', 'cc.js'),
    },
};

/*
 * Plugins
 */

const env = new EnvironmentPlugin({
    NODE_ENV: 'development',
    PORT: 1337,
    HOST: 'localhost',
});

const html = new HtmlWebpackPlugin({
    inject: false,
    template: '!pug-loader!./index.pug',
    title: 'Pizda',
    appMountId: 'mount',
    mobile: true,
    version: 'version.js',
});

const named = dev ? new NamedModulesPlugin() : null;

const errors = dev ? new NoEmitOnErrorsPlugin() : null;

const babili = dev ? null : new BabiliPlugin();

const compression = dev ? null : new CompressionPlugin();

const analyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    defaultSizes: dev ? 'stat' : 'gzip',
    openAnalyzer: false,
    logLevel: 'silent',
});

const notifier = new NotifierPlugin({
    alwaysNotify: true,
    title: 'webpack',
});

const dashboard = dev ? new DashboardPlugin({ port: parseInt(process.env.DASHBOARD) }) : null;

const build = new BuildPlugin();

/*
 * Rules
 */

const json = {
    test: /\.json$/,
    exclude: /node_modules/,
    use: [{ loader: 'json-loader' }],
};

const file = {
    test: /\.(?:png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/,
    exclude: /node_modules/,
    use: [{ loader: 'file-loader' }],
};

const js = {
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
};

/*
 * Generate and export config
 */

module.exports = [
    {
        target,
        context,
        entry,
        output,
        externals,
        devtool,
        devServer,
        watch,
        node,
        resolve,
        plugins: [env, html, named, errors, babili, compression, analyzer, notifier, dashboard, build].filter(Boolean),
        module: { rules: [json, file, js] },
    },
].filter(Boolean);
