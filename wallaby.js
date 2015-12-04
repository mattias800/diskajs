var babel = require('babel-core');

var babelConfig = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '.babelrc')));
babelConfig.babel = babel;

module.exports = function(wallaby) {
    return {
        files : [
            {
                pattern : 'node_modules/babel/node_modules/babel-core/browser-polyfill.js',
                instrument : false
            },
            'src/**/*.js',
            'test-resources/**/*.js'
        ],

        tests : [
            'test/**/*.js'
        ],

        env : {
            type : 'node'
        },

        compilers : {
            '**/*.js' : wallaby.compilers.babel(babelConfig)
        },
        "testFramework" : "mocha@2.1.0"
    };
};