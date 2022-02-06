import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name].[hash][ext]',
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 4000,
    },
} as Configuration);

export default config;
