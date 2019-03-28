// Webpack base config

import HtmlWebPackPlugin from 'html-webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'
import CopyPlugin from 'copy-webpack-plugin'
import moduleResolvers from '../moduleResolvers'
import * as getGqlTransformer from 'ts-transform-graphql-tag'
import { Configuration } from 'webpack'

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// * entry - configure entry point for babel polyfill
// * output - publicPath - needed to resolve bundle in sub routes
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter
const commonConfigutation: Configuration = {
  entry: ['./src/index'],
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html' }),
    new DotenvPlugin({ path: './config/.env' }),
    new CopyPlugin([{ from: './src/globalStyles/favicon/', to: './' }]),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/react',
              ['@babel/env', { modules: false }],
            ],
            getCustomTransformers: () => ({
              before: [getGqlTransformer.getTransformer()],
            }),
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/fonts/',
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: moduleResolvers,
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
  },
}

export default commonConfigutation
