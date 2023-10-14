const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate(info) {
      const rel = path.relative(__dirname, info.absoluteResourcePath).replaceAll("\\", "/").replaceAll("C:/Users/Admin/AppData/Roaming/npm/pnpm-global/5/node_modules/.pnpm", "node_modules/.pnpm-global").replaceAll("../", "");
      if (rel.endsWith(".css")) return `webpack://MusicHub/${info.resourcePath}`;
      if (rel.startsWith("src"))
        return `webpack://MusicHUB${rel.replaceAll("src", "")}`;
      return `webpack://${rel}`;
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: path.join(__dirname, "dist", "index.html"), publicPath: "/" })
  ],
};