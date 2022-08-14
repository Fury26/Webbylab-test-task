const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 3000,
		open: true,
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new Dotenv(),
	],
};
