const autoprefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports =  (env, argv) => {
  function isDevelopment() {
    return argv.mode === 'development';
  }
  var config = {
    entry: ['./js/index.js', './css/style.scss'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(process.cwd(), 'dist')
    },
    optimization: {
      minimizer: [
          new TerserPlugin(),
          new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true
            }
          }
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCSSExtractPlugin({
        filename: "bundle.css"
      })
    ],
    devtool: isDevelopment() ? 'source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    "pragma": "React.createElement",
                    "pragmaFrag": "React.Fragment",
                    "development": isDevelopment()
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
              postcssOptions: {
                plugins: [
                  [
                    require('autoprefixer')({
                                                'browsers': ['> 1%', 'last 2 versions']
                                              })
                  ]
                ]
              }
            }
            },
            'sass-loader'
          ]
        },
        {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
      ]
    }
  };
  return config;
}
