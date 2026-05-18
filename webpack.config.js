const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'production',
    devServer: {
        port: 8000,
    },
    entry: './bootstrap.js',
    output: {
        path: distPath,
        filename: 'yewchat.js',
        webassemblyModuleFilename: 'yewchat_bg.wasm',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: './static', to: distPath }],
        }),
        new WasmPackPlugin({
            crateDirectory: '.',
            extraArgs: '-- --features wee_alloc',
            outName: 'yewchat',
        }),
    ],
    experiments: {
        asyncWebAssembly: true,
    },
    performance: {
        maxAssetSize: 512000,  // Naikkan batas menjadi 500 KiB
        maxEntrypointSize: 512000,
        hints: 'warning'   
    }
};
