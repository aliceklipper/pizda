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
// const OfflinePlugin = require('offline-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const NotifierPlugin = require('webpack-notifier');
const ProgressPlugin = require('progress-bar-webpack-plugin');

/* Import other helpers */
const R = require('ramda');
const chalk = require('chalk');
const { dev } = require('alice-helpers');

/* Define shortcuts for some webpack plugins */
const { DefinePlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;

/*
 * Some preparations
 */

const restore = (() => {
    const log = console.log.bind(console);

    const buffer = [];

    console.log = (...args) => buffer.push(args); // eslint-disable-line fp/no-mutating-methods

    return () => {
        log();
        buffer.forEach(item => log(...item));
        console.log = log;
    };
})();

function backgroundColor(color) {
    return `bg${color[0].toUpperCase()}${color.substring(1)}`;
}

function powerlineSymbol(symbol) {
    switch (symbol) {
        case '}':
            return '\uE0B0';
        case '{':
            return '\uE0B2';
        default:
            return symbol;
    }
}

function powerlineForeground(options) {
    if (options.foreground) {
        return {
            ...options,
            message: chalk[options.foreground](options.message),
        };
    } else {
        return options;
    }
}

function powerlineBackground(options) {
    if (options.background) {
        return {
            ...options,
            message: chalk[backgroundColor(options.background)](options.message),
        };
    } else {
        return options;
    }
}

function powerlinePadding(options) {
    if (options.padding) {
        return {
            ...options,
            message: [
                powerlineBackground({ message: ' ', background: options.background }).message, // Paint left padding with background color.
                options.message,
                powerlineBackground({ message: ' ', background: options.background }).message, // Paint right padding with background color.
            ].join(''),
        };
    } else {
        return options;
    }
}

function powerlineNext(options) {
    if (!options.end) {
        return options;
    } else if (options.end === ' ') {
        return {
            ...options,
            message: [options.message, powerlineBackground({ ...options, message: ' ' }).message].join(''),
        };
    } else {
        return {
            ...options,
            message: [
                options.message,
                powerlineForeground({
                    ...powerlineBackground({ message: powerlineSymbol(options.end), background: options.next }),
                    foreground: options.background,
                }).message,
            ].join(''),
        };
    }
}

function powerlinePrevious(options) {
    if (!options.start) {
        return options;
    } else if (options.start === ' ') {
        return {
            ...options,
            message: [powerlineBackground({ ...options, message: ' ' }).message, options.message].join(''),
        };
    } else {
        return {
            ...options,
            message: [
                powerlineForeground({
                    ...powerlineBackground({ message: powerlineSymbol(options.start), background: options.previous }),
                    foreground: options.background,
                }).message,
                options.message,
            ].join(''),
        };
    }
}

function powerline(options) {
    return R.compose(powerlinePrevious, powerlineNext, powerlineBackground, powerlineForeground, powerlinePadding)(options).message;
}

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

// const offlinePlugin = () =>
//     new OfflinePlugin({
//         ServiceWorker: {
//             navigateFallbackURL: '/',
//             responseStrategy: 'network-first',
//             updateStrategy: 'all',
//             version: '[hash]',
//         },
//     });

const prerenderPlugin = () => (dev() ? null : new PrerenderSpaPlugin(join(process.cwd(), 'build'), ['/']));

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

const progressPlugin = () =>
    new ProgressPlugin({
        callback: restore,
        width: process.stdout.columns + 100,
        complete: chalk.bgCyan(' '),
        format: [
            powerline({ message: 'RocketBroom', padding: true, foreground: 'black', background: 'green', next: 'cyan', end: '}' }),
            powerline({
                message: dev() ? 'WDS' : 'webpack',
                padding: true,
                foreground: 'black',
                background: 'cyan',
                next: 'blue',
                end: '}',
            }),
            powerline({ message: process.env.NODE_ENV, padding: true, foreground: 'black', background: 'blue', end: '}' }),
            powerline({ message: ':percent', padding: true }),
            chalk.cyan(powerlineSymbol('{')),
            ':bar',
            chalk.cyan(powerlineSymbol('}')),
        ].join(''),
        clear: false,
    });

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
            // offlinePlugin(),
            prerenderPlugin(),
            analyzerPlugin(),
            notifierPlugin(),
            progressPlugin(),
        ].filter(Boolean),
        module: { rules: [jsonRule(), fileRule(), jsRule()] },
    },
].filter(Boolean);
