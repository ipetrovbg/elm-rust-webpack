const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'file-loader', //?name=[name].[ext]
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: {
                    loader: 'elm-webpack-loader?verbose=true&warn=true',
                    options: {
                        optimize: true
                        , runtimeOptions: ['-A128M', '-H128M', '-n8m']
                        // , forceWatch: true
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        }
                    },
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                ]
            },
        ]
        , noParse: /\.elm$/
    },
    output: {
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        inline: true,
        stats: {colors: true},
        historyApiFallback: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new WasmPackPlugin({
            crateDirectory: path.relative(__dirname, 'rust'), // Define where the root of the rust code is located (where the cargo.toml file is located)
        })
    ],
    experiments: {
        asyncWebAssembly: true
    }
};
