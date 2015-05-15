module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            build: {
                src: ["lib/"]
            }
        },
        mochacli: {
            options: {
                harmony: true,
                compilers: ['babel']
            },
            all: ['test/**/*.js']
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    cwd: './src/',
                    expand: true,
                    src: ['**/*.js'],
                    dest: './lib/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'babel']);
    grunt.registerTask('default', ['build']);

};
