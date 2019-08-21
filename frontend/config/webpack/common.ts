// Webpack base config

// libraries
import { Configuration, ProgressPlugin } from 'webpack'
import * as getGqlTransformer from 'ts-transform-graphql-tag'
import CopyPlugin from 'copy-webpack-plugin'
import DotenvPlugin from 'dotenv-webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
// interfaces
import { WebpackConfigParams } from 'types/types'
// helper
import moduleResolvers from '../moduleResolvers'
import presetConfig from './presets/loadPresets'

// * entry - configure entry point of the application
// * output
// - publicPath - needed to resolve bundle in sub routes
// - chunkFilename / filename = structure how to generate file names. The hash is required, this way we can use a long max-age for the cache.
// If the file cahnges, the hash in the name changes and the files gets fetch freshly.
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
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: {
              loader: 'awesome-typescript-loader',
              options: {
                useCache: true,
                cacheDirectory: './config/webpack/.atl-cache',
                forceIsolatedModules: true,
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
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  )
}

export default commonConfigutation
