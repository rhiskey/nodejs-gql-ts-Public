const path = require('path');

module.exports = {
    entry: './server.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {/* Loader options go here */ }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(sa|sc|c)ss$/,
            //     use: [
            //       {
            //         loader: MiniCssExtractPlugin.loader,
            //         options: {
            //           hmr: process.env.NODE_ENV === 'development',
            //         },
            //       },
            //       'css-loader',
            //       'postcss-loader',
            //       'sass-loader',
            //     ],
            //   },
            //   {
            //     test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
            //     loader: 'file-loader?name=assets/fonts/[name].[ext]',
            //   }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle-[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 4000
    },

};