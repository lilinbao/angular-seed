/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg:grunt.file.readJSON('package.json'),
    meta: {
      version: '<%=pkg.version%>'
    },
    banner: '/*! <%=pkg.name%> - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* <%=pkg.website%>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      '<%=pkg.author%>; Licensed MIT '+
      '\n*\n*/\n\n\n\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        files: [
          {src:['app/js/*.js'],dest:'dist/js/app.js'},
          {src:['app/js/lib/*/*.js'],dest:'dist/js/lib.js'}
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files:[
          {src: '<%= concat.dist.files[0].dest %>', dest: 'dist/js/app.min.js'},
          {src: '<%= concat.dist.files[1].dest %>', dest: 'dist/js/lib.min.js'},
        ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }//,
      //lib_test: {
        //src: ['lib/**/*.js', 'test/**/*.js']
      //}
    },
    qunit: {
      files: ['e2e-tests/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    bower: {  
      install: {
        options: {
              targetDir: "./app/js/lib",
              layout: "byComponent",
              install: true,
              verbose: false,
              cleanTargetDir: false
            }
          }
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  grunt.registerTask('default', ['jshint', /*'qunit',*/ 'concat', 'uglify']);

};
