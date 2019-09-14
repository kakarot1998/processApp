 const webpack = require('webpack');
 const path = require('path');
  module.exports = {
    mode : 'development',
    entry: './script/processEngine.js',
    output: {
      path: path.resolve(__dirname, 'script'),
      filename: "bundle.js",
      libraryTarget: 'var'
      //library: 'ps'
    },
    resolve: {
      modules:[
        "node_modules",
        path.resolve(__dirname)
      ],

    },
    target: 'node',
    externals:{
      "fs": "require('fs')",
      "path": "require('path')",
      "uuid": "require('uuid')",
      "dataFile": "require('../JSONFiles/processData.json')",
      "$": "require('jquery')"

  }
  };