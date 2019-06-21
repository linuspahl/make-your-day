// Webpack base config

import HtmlWebPackPlugin from 'html-webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'
import CopyPlugin from 'copy-webpack-plugin'
import moduleResolvers from '../moduleResolvers'
import * as getGqlTransformer from 'ts-transform-graphql-tag'
import { Configuration, ProgressPlugin } from 'webpack'
import presetConfig from './presets/loadPresets'
import merge from 'webpack-merge'
import { WebpackConfigParams } from 'types/types'

// * entry - configure entry point of the application
// * output
// - path - directory of the output, defined in prod and dev conf
// - publicPath - needed to resolve bundle in sub routes
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter

const modeConfig = (mode: WebpackConfigParams['mode']): Configuration =>
  require(`./modeConfigs/webpack.${mode}`).default()

const commonConfigutation = (
  { mode, presets }: WebpackConfigParams = { mode: 'production', presets: [] }
): Configuration => {
  return merge(
    {
      entry: ['./src/index.tsx'],
      output: {
        publicPath: '/',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: {
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: (): object => ({
                  before: [getGqlTransformer.getTransformer()],
                }),
              },
            },
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
      plugins: [
        new HtmlWebPackPlugin({ template: './src/index.html' }),
        new DotenvPlugin({ path: './config/.env' }),
        new CopyPlugin([{ from: './src/globalStyles/favicon/', to: './' }]),
        new ProgressPlugin(),
      ],
      resolve: {
        modules: moduleResolvers,
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  )
}

export default commonConfigutation
