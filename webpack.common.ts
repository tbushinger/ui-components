import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
    entry: {
        main: './src/index.tsx',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        preprocessor: async (content: string, _loaderContext: any) => {
                            // (_loaderContext.mode === "development") 
                            const extensionUtilsPath = "../extension/";

                            return content.replace(/\[extensionUtilsPath\]/g, extensionUtilsPath);
                        },
                    },
                },
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
        ],
    },
};

export default config;
