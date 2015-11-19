module.exports = function(grunt) {

  grunt.initConfig({
    jsDir: 'public/javascripts/',
    jsDistDir: 'dist/javascripts/',
    cssDir: 'public/stylesheets/',
    cssDistDir: 'dist/stylesheets/',
    pkg: grunt.file.readJSON('package.json'),
    /*
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>/components/*.js','<%=jsDir%>/rest/*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      min: {
        files: grunt.file.expandMapping(['public/javascripts/**/*.js'], 'dist/', {
            rename: function(destBase, destPath) {
                return destBase+destPath.replace('.js', '.min.js');
            }
        })
      }
      /*
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
      */
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
    files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
    tasks: ['concat', 'uglify', 'cssmin']
    },
    nodemon: {
      dev: {
          script: './bin/www'
      }
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('min', ['uglify']);

  grunt.registerTask('default',['nodemon']);

  grunt.registerTask('run', ['nodemon']);

};