module.exports = function(grunt) {

  grunt.initConfig({
    jsDir: 'public/javascripts',
    jsDistDir: 'dist/public/javascripts',
    cssDir: 'public/stylesheets',
    routesDir: 'routes',
    distRoutesDir: 'dist/routes',
    viewsDir: 'views',
    distViewsDir: 'dist/views',
    nodeModules: 'node_modules',
    distNodeModules: 'dist/node_modules',
    cssDistDir: 'dist/public/stylesheets',
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      min: {
          files: [{
            cwd: '<%= jsDir %>',
            src: '**/*.js',
            dest: '<%= jsDistDir %>',
            ext: '.min.js',
            expand: true
          }]
      }
    },
    cssmin: {
      options: {
         banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      min: {
          files: [{
              cwd: '<%= cssDir %>',
              src: '**/*.css',
              dest: '<%= cssDistDir %>',
              ext: '.min.css',
              expand: true
          }]
     }
    },
    watch: {
    files: ['<%= jsDir %>/*.js', '<%= cssDir %>/*.css'],
    tasks: ['concat', 'uglify', 'cssmin']
    },
    nodemon: {
      dev: {
          script: './bin/www'
      }
    },
    jshint: {
      ignore_warning: {
           options: {
                expr : true,  //Expression warning
                '-W033': true,
                '-W064': false, //Constructor warning
           },
           src: ['!Gruntfile.js','<%= jsDistDir %>/rest/rest.min.js',
                  '<%= jsDistDir %>/components/index.min.js']
      },
    },
    clean: {
        build: {
            src: [ '<%= distDir %>']
        },
    },
    copy: {
      main: {
            files: [
                 {
                       cwd: '<%= routesDir %>',
                       expand: true,
                       src: ['**/*.js'],
                       dest: '<%= distRoutesDir %>'
                 },
                 {
                       cwd: '<%= viewsDir %>',
                       expand: true,
                       src: ['**/*.jade'],
                       dest: '<%= distViewsDir %>'
                 },
                 {
                       cwd: 'bin',
                       expand: true,
                       src: ['www'],
                       dest: '<%= distDir %>/bin/'
                 },
                 {
                       cwd: '<%= nodeModules %>',
                       expand: true,
                       src: [ '*/**','!grunt*/**'],
                       dest: '<%= distNodeModules %>'
                 },
                 /** Correção para buscar alguns javascripts que foram colocados no diretório dos css[s] **/
                 {
                       cwd: '<%= cssDir %>',
                       expand: true,
                       flatten: true,
                       src: ['**/*.min.js'],
                       dest: '<%= jsDistDir %>'
                 },
                 /** Cópia de css[s] de terceiros para o diretório css (flatten copy) **/
                 {
                       cwd: '<%= cssDir %>',
                       expand: true,
                       flatten: true,
                       src: ['**/*.min.css'],
                       dest: '<%= cssDistDir %>'
                 },
                 {
                       expand: true,
                       src: ['*.js','!Grunt*'],
                       dest: '<%= distDir %>'
                 }
           ]
      }

                       //   ,'views/**/*.jade','node_modules/**','!node_modules/grunt-contrib-*','*.js','bin/www','!Gruntfile.js'], dest: 'dist/'},
                      // {expand: true, flatten: true, src: ['public/stylesheets/**/*.min.css'], dest: 'dist/public/stylesheets'},
                      // {expand: true, flatten: true, src: ['public/stylesheets/**/*.min.js'], dest: 'dist/public/javascripts'}
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('min', ['uglify','watch']);

  grunt.registerTask('default',['nodemon']);

  grunt.registerTask('javascript-check',['uglify','cssmin','jshint']);

  grunt.registerTask('run', ['nodemon']);

  grunt.registerTask('build','Compiles all of the assets in project notasViewer', ['clean','uglify','cssmin','copy']);

};