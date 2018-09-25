const _path = require('path');

module.exports = {
    entry: './main.js',
	
    output: {
      path: _path.resolve(__dirname, '../WebUI/Scripts'),
      filename: 'gui.js'
    },
	
    devServer: {
        inline: true,
        port: 7000,
        after: function(app) {
            app.use("/*", (req,res) => res.sendFile(_path.join(__dirname, 'index.html')));
        }
    },
	
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "eslint-loader",
                    options: {
                        formatter: require("eslint-friendly-formatter"),
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: 'babel-loader',
                        options: 
                        {
                            presets: ['react','es2015']
                        }
                    }
                ],
            },
            { 
                test: /\.css$/, 
                use: ['style-loader','css-loader']
            },
            { 
              test: /\.(svg|woff|woff2|[ot]tf|eot)$/, 
              use: ['url-loader']
            }
        ]
    },
    resolve:{
        extensions: ['.js','.jsx']
    },
    devtool : "source-map"   
};