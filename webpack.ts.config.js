const path = require('path');

module.exports = {
  entry: {
    '01_rxjs': './src/ts/rxjs.spec.ts'
  },
  output: {
    filename: '[name].spec.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader", exclude: /node_module/ },
      { test: /sinon\/pkg\/sinon\.js/, loader: 'imports?define=>false,require=>false' }
    ]
  },
  resolve : {
    extensions: ["", ".ts", ".js"],
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  }
};
