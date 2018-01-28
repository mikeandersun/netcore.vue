var fs = require("fs");
const path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const prod = process.argv.indexOf('-p') !== -1;


module.exports = {
    entry: {
        // Output a "home.js" file from the "home-page.ts" file
        styles: './styles.js',
        home: './Scripts/home/home-page.ts',
        // Output a "contact.js" file from the "contact-page.ts" file
        contact: './Scripts/contact/contact-page.ts'
    },
    // Make sure Webpack picks up the .ts files
    resolve: {
        extensions: ['.ts', '.js', '.vue','css','scss', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                //test: /\.tsx?$/,
                //loader: 'ts-loader',
                //exclude: /node_modules/,
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }

            ,
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
             {
                test: /\.scss$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    }
                )
            }

        ],
        
    },
    plugins: [

        // Output stats.json
        function () {
            // When webpack has finished
            this.plugin("done", function (stats) {
                // try and find a "Webpack" folder
                var wpPath = path.join(__dirname, "Webpack");
                if (fs.existsSync(wpPath) === false) {
                    // If it doesn't exist, create it
                    fs.mkdirSync(wpPath);
                }
                // write the stats.json file to the Webpack folder
                fs.writeFileSync(
                    path.join(wpPath, "stats.json"),
                    JSON.stringify(stats.toJson()));
            });
        },
        // Use a plugin which will move all common code into a "vendor" file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
        , new ExtractTextPlugin({
            filename: "styles.css",
            
            allChunks: true
        })
    ],

    output: {
        // The format for the outputted files
        filename: (prod) ? "[name].[chunkhash].js" : "[name].js",
        // Put the files in "wwwroot/js/"
        path: path.resolve(__dirname, 'wwwroot/')
    }
};