const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    concat: {
      js: {
        src: [
          'node_modules/photoswipe/dist/photoswipe.min.js',
          'node_modules/photoswipe/dist/photoswipe-ui-default.min.js',
          'src/theme.js'
        ],
        dest: 'static/assets/bundle.js'
      },
      css: {
        src: [
          'node_modules/normalize.css/normalize.css',
          'node_modules/photoswipe/dist/photoswipe.css',
          'node_modules/photoswipe/dist/default-skin/default-skin.css',
          'src/theme.css'
        ],
        dest: 'static/assets/bundle.css'
      }
    },
    watch: {
      css: {
        files: ['**/*.css'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.registerTask('copy', 'Copy dependencies', function() {
    let files = [
      'node_modules/photoswipe/dist/default-skin/default-skin.svg'
    ];
    for (let i = 0; i < files.length; ++i) {
      let name = path.parse(files[i]).base;
      fs.copyFile(files[i], 'static/assets/' + name, function(err) {
        if (err) throw err;
      });
    }
  });

  grunt.registerTask('default', ['copy', 'concat']);

};
