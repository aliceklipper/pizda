/*
 eslint
 no-magic-numbers: off,
 import/no-extraneous-dependencies: off,
 import/no-commonjs: off,
 import/unambiguous: off,
 fp/no-mutation: off
 */

/* Import builtin modules */
const { join } = require('path');

/* Import webpack */
const webpack = require('webpack');

/* Import webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

/* Import other helpers */
const { dev } = require('alice-helpers');

/* Define shortcuts for some webpack plugins */
const { DefinePlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;

/*
 * Config options
 */

/* Target configuration */
const target = () => 'web';

/* Context configuration */
const context = () => process.cwd();

/* Entry point configuration */
const entry = () => ({
    index: ['babel-polyfill', './src/index.jsx'].filter(Boolean),
});

/* Output configuration */
const output = () => ({
    chunkFilename: '[id].js',
    filename: '[name].js',
    path: join(process.cwd(), 'build'),
    pathinfo: dev(),
    publicPath: `http://localhost:${process.env.PORT}/${process.env.PUBLIC_PATH}`,
});

/* Source maps configuration */
const devtool = () => (dev() ? 'source-map' : undefined);

/* Development server configuration */
const devServer = () => ({
    compress: true,
    port: 1337,
    historyApiFallback: true,
    publicPath: process.env.PUBLIC_PATH,
    contentBase: join(process.cwd(), 'build'),
    watchContentBase: true,
    hot: false,
});

/* Watch configuration */
const watch = () => dev();

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
    return new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PORT': JSON.stringify(process.env.PORT),
    });
};

const htmlPlugin = () => {
    return new HtmlWebpackPlugin({
        inject: false,
        template: '!pug-loader!./page.pug',
        title: 'Pizda',
        appMountId: 'mount',
        mobile: true,
    });
};

const namedPlugin = () => (dev() ? new NamedModulesPlugin() : null);

const errorsPlugin = () => (dev() ? new NoEmitOnErrorsPlugin() : null);

const babiliPlugin = () => (dev() ? null : new BabiliPlugin());

const compressionPlugin = () => (dev() ? null : new CompressionPlugin());

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
        plugins: [envPlugin(), htmlPlugin(), namedPlugin(), errorsPlugin(), babiliPlugin(), compressionPlugin()].filter(Boolean),
        module: { rules: [jsonRule(), fileRule(), jsRule()] },
    },
].filter(Boolean);
