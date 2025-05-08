module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],      //config babel to transform js and jsx files for testing
    "plugins": ["@babel/plugin-transform-runtime"]              //included to ignore css files for jest tests
};
  