module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      seed: ['./app/js/build', './app/js/vendor', './app/css', './app/fonts', './app/less/bootstrap'],
      seedReact: ['./app/js/build']
    },
    copy: {
      seed: {
        files: [{
          expand: true,
          nonull: true,
          cwd: './bower_components/jquery/dist',
          src: 'jquery*',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/less',
          src: '**',
          dest: './app/less/bootstrap/'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/dist/fonts',
          src: '**',
          dest: './app/fonts'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/bootstrap/dist/js',
          src: 'bootstrap*',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/react',
          src: 'react*',
          dest: './app/js/vendor'
        }, {
          expand: true,
          nonull: true,
          cwd: './bower_components/underscore',
          src: 'underscore*',
          dest: './app/js/vendor'
        }]
      }
    },
    less: {
      seed: {
        options: {
          compress: true,
          modifyVars: {
            'icon-font-path': '"../fonts/bootstrap/"',
            'border-radius-base': '0',
            'border-radius-large': '0',
            'border-radius-small': '0'
          }
        },
        files: {
          'app/css/bootstrap.css': 'app/less/bootstrap/bootstrap.less'
        }
      }
    },
    connect: {
      seed: {
        options: {
          port: 9000,
          base: './app'
        }
      }
    },
    browserify: {
      seed: {
        options: {
          debug: false,
          transform: ['reactify']
        },
        files: {
          'app/js/build/build.js': 'app/js/src/**/*.js'
        }
      }
    },
    watch: {
      seed: {
        options: {
          spawn: false,
          livereload: true
        },
        files: ['./app/js/src/**/*.js','./app/index.html'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', 'Show Default Message', function() {
    grunt.log.ok(['Please use `grunt first` to create the initial folder structure']);
    grunt.log.ok(['Please use `grunt build` to create and reload the app']);
    grunt.log.ok(['Please use `grunt serve` to serve the files @ localhost:9000']);
    grunt.log.ok(['Please use `grunt live` to watch file changes']);
  });

  grunt.registerTask('first', 'Create folders and copy files', function() {
    grunt.log.ok(['Creating initial folder structure and copying  files']);
    grunt.task.run(['clean:seed', 'copy:seed', 'less:seed']);
  });

  grunt.registerTask('build', 'Create build files', function() {
    grunt.log.ok(['Compiling *.jsx files and creating build files']);
    grunt.task.run(['browserify:seed', 'watch:seed']);
  });

  grunt.registerTask('serve', 'Serve the files @ localhost:9000', function() {
    grunt.log.ok(['Serving files @ localhost:9000']);
    grunt.log.ok(['Use Ctrl + c to stop the server']);
    grunt.task.run(['connect:seed::keepalive']);
  });

  grunt.registerTask('live', 'Watch with live reload', function() {
    grunt.log.ok(['Watching for changes']);
    grunt.log.ok(['Use Ctrl + c to stop watching']);
    grunt.task.run(['watch:seed']);
  });
};