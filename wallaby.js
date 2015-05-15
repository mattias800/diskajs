var babel = require('babel');

module.exports = function(wallaby) {
    return {
        files: [
            {
                pattern: 'node_modules/babel/node_modules/babel-core/browser-polyfill.js',
                instrument: false
            },
            'src/**/*.js',
            'test-resources/**/*.js'
        ],

        tests: [
            'test/**/*.js'
        ],

        env: {
            type: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: babel,
                // https://babeljs.io/docs/usage/experimental/
                stage: 0
            })
        },
        "testFramework": "mocha@2.1.0"
    };
};