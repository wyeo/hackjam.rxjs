module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
    ],

    tests: [
      'src/*spec.js',
    ],

    env: {
      type: 'node',
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  };
};
