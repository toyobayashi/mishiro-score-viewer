import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import { mode, getPath, config } from './constant'

const webpackConfig: Configuration = {
  mode,
  context: getPath(),
  entry: {
    main: [getPath('./src/index.ts')]
  },
  output: {
    filename: '[name].js',
    path: getPath(config.outputPath)
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: mode !== 'production'
            }
          }
        ]
      },
      {
        test: /\.csv$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'score/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /favicon.ico/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bgm/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Score',
      template: getPath('./src/index.html'),
      chunks: ['main', 'dll', 'common']
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
      cacheGroups: {
        dll: {
          test: /[\\/]node_modules[\\/]/,
          name: 'dll'
        }
      }
    }
  }
}

if (mode === 'production') {
  const uglifyJS = () => new UglifyJSPlugin({
    parallel: true,
    cache: true,
    uglifyOptions: {
      output: {
        comments: false
      }
    }
  })
  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
  webpackConfig.optimization = {
    ...(webpackConfig.optimization || {}),
    minimizer: [
      uglifyJS(),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
} else {
  webpackConfig.devtool = 'eval-source-map'
  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]

  if (config.publicPath) {
    webpackConfig.output && (webpackConfig.output.publicPath = config.publicPath)
  }
}

export default webpackConfig
