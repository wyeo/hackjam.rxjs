const path = require('path');

module.exports = {
  entry: {
<<<<<<< HEAD
    '00_intro': './src/js/intro.spec.js',
    '01_rxjs': './src/js/rxjs.spec.js'
=======
    '00_intro': './src/intro.spec.js',
    '01_rxjs': './src/rxjs.spec.js'
>>>>>>> random-exercises
  },
  output: {
    filename: '[name].spec.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_module/ },
      { test: /sinon\/pkg\/sinon\.js/, loader: 'imports?define=>false,require=>false' }
    ]
  },
  resolve : {
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  }
};
