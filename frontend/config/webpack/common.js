// # Webpack base config
// ## Typescript
// In a perfect world, all our webpack configuration files would be written in typescript.
// https://webpack.js.org/configuration/configuration-languages/#typescript
// The problem is, this only works if the tsconfig module is set to commonjs.
// Due to our dynamic imports, we need to set the module to esnext.

/* eslint-disable @typescript-eslint/no-var-requires */
var HtmlWebPackPlugin = require('html-webpack-plugin')
var DotenvPlugin = require('dotenv-webpack')
var CopyPlugin = require('copy-webpack-plugin')
var getTransformer = require('ts-transform-graphql-tag').getTransformer
var { ProgressPlugin } = require('webpack')
var presetConfig = require('./presets/loadPresets')
var merge = require('webpack-merge')

// * entry - configure entry point of the application
// * output
// - path - directory of the output, defined in prod and dev conf
// - publicPath - needed to resolve bundle in sub routes
// * plugins - HtmlWebpackPlugin - needed to create the index.html with a script tag for the created JS bundle
// * resolve / modules - will make import paths shorter
const modeConfig = mode => require(`./modeConfigs/webpack.${mode}`)
const commonConfigutation = (
  { mode, presets } = { mode: 'production', presets: [] }
) => {
  return merge(
    {
      entry: ['./src/index.tsx'],
      output: {
        publicPath: '/',
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: {
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [getTransformer()],
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
        modules: ['./src', './node_modules', './config'],
        extensions: ['.mjs', '.js', '.ts', '.tsx'],
      },
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  )
}

module.exports = commonConfigutation
