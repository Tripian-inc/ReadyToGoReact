const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js', // '[name].react.bundle.js',
    // library: '[name]',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader'] },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'src'),
              },
            },
          },
        ],
      },
      { test: /\.(sa|sc)ss$/, loader: 'sass-loader' },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|test|lib)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(woff|ttf|eot|png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
        },
        /* options: {
          name: 'assets/[path][name].[ext]',
        }, */
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'min.css', // '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessor: cssnano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
