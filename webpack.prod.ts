import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = merge(common, {
    mode: 'production',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'extension/app/dist'),
        assetModuleFilename: 'assets/[name].[hash][ext]',
    },
    plugins: [new CleanWebpackPlugin()],
} as Configuration);

export default config;
