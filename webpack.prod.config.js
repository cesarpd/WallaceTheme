var ExtractTextPlugin = require("extract-text-webpack-plugin");
let ngTools = require('@ngtools/webpack');
let webpack = require('webpack');

let path = require('path');

module.exports = {
     entry: {
        app: './src/ng-app/main-prod.ts'
     },
     output: {
         path: './dist',
         filename: 'app.bundle.js'
     },
     devtool: "source-map", 
     resolve: {
       extensions: ['.ts', '.js', '.scss', '.html']
     },
     module: {
         loaders: [
         { 
         	test: /\.scss$/, 
         	loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap') 
         },
         {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']    
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
          },
         ]
       },
       plugins: [
             new ExtractTextPlugin("styles.css"),
             new webpack.LoaderOptionsPlugin({
               minimize: true,
               debug: false
             }),
             new webpack.optimize.UglifyJsPlugin({
               compress: {
                 warnings: false
               },
               output: {
                 comments: false
               },
               sourceMap: true
             })
             // new ngTools.AotPlugin({
             //       tsConfigPath: path.join(process.cwd(), 'tsconfig.aot.json'),
             //       baseDir: process.cwd(),
             //       entryModule: path.join(process.cwd(), 'src', 'app', 'app.module') + '#AppModule'
             //     }),
     	]
 };