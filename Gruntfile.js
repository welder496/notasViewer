module.exports = function(grunt) {

  grunt.initConfig({
    jsDir: 'public/javascripts',
    jsDistDir: 'dist/public/javascripts',
    imagesDir: 'public/images',
    videosDir: 'public/videos',
    cssDir: 'public/stylesheets',
    routesDir: 'routes',
    distRoutesDir: 'dist/routes',
    viewsDir: 'views',
    distViewsDir: 'dist/views',
    imagesDistDir: 'dist/public/images',
    videosDistDir: 'dist/public/videos',
    nodeModules: 'node_modules',
    distNodeModules: 'dist/node_modules',
    cssDistDir: 'dist/public/stylesheets',
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    machine: grunt.file.readJSON('machine.json'),
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
                 /** Cópia das imagens usadas no help **/
                 {
                       cwd: '<%= imagesDir %>',
                       expand: true,
                       src: ['**/*-Teste.jpg','**/*-Teste.jpeg'],
                       dest: '<%= imagesDistDir %>'
                 },
                 /** Cópia de vídeos usados no help **/
                 {
                       cwd: '<%= videosDir %>',
                       expand: true,
                       src: ['**/*.mp4'],
                       dest: '<%= videosDistDir %>'
                 },
                 /** Copiando as fontes ou glyphicons do bootstrap 3.3.4 **/
                 {
                       cwd: '<%= cssDir %>/bootstrap-3.3.4/fonts/',
                       expand: true,
                       src: ['**/*'],
                       dest: '<%= cssDistDir %>/bootstrap-3.3.4/fonts/'
                 },
                 {
                       expand: true,
                       src: ['*.js','userInfo','!Grunt*','!karma*'],
                       dest: '<%= distDir %>'
                 }
           ]
      }
    },
    sshconfig: {
       "host": grunt.file.readJSON('machine.json')
    },
    sftp: {
       deploy : {
           files: {
                "./" : "dist/**"
           },
           options: {
                config: "host",
                path: '/home/<%= machine.username %>/<%= pkg.name %>',
                srcBasePath: "dist/",
                createDirectories: true
           }
       }
    },
    sshexec : {
       remove : {
          command: "rm -rf <%= pkg.name %>",
          options: {
                config: "host"
          }
       },
       start: {
           command: [
                 'cd <%= pkg.name %>',
                 'forever start ./bin/www'].
           join(' && '),
           options: {
                config: "host"
           }
       },
       stop: {
           command: [
                 'cd <%= pkg.name %>',
                 'forever stop ./bin/www'].
           join(' && '),
           options: {
                config: "host"
           }
       },
       make: {
            command: "mkdir <%= pkg.name %>",
            options: {
                 config: "host"
            }
       },
       change: {
            command: "cd <%= pkg.name %>",
            options: {
                 config: "host"
            }
       },
       removes: {
            command: [
              'cd /home/<%= machine.username %>/<%= pkg.name %>/public/stylesheets',
              'rm -rf datatables',
              'rm -rf jquery',
              'rm -rf jquery-ui',
              'rm -rf tokenfield'
            ].join(' && '),
            options: {
                 config: "host",
                 ignoreErrors: true
            }
       }
    },
    nodeunit: {
        all: ['tests/**/*test.js','tests/**/*Test.js'],
        options: {
            reporter: 'junit',
            reporterOptions: {
                output: 'testsOutput'
            }
         }
    },
    bumpup: {
         options: {
              updateProps: {
                 pkg: 'package.json'
              }
         },
         file: 'package.json'
    },
    shell: {
           'git-add':{
                  command: 'git --no-pager add .',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-commit':{
                  command: 'git --no-pager commit -m "notasViewer versão <%= pkg.version %>"',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-tag':{
                  command: 'git --no-pager tag <%= pkg.version %>',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-push':{
                  command: 'git push notasGitHubViewer <%= pkg.version %>',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('min', ['uglify','watch']);

  grunt.registerTask('default',['nodemon']);

  grunt.registerTask('javascript-check',['uglify','cssmin','jshint']);

  grunt.registerTask('run', ['nodemon']);

  grunt.registerTask('build','Compiles all of the assets in project notasViewer', ['clean','uglify','cssmin','copy' /*,'bumpup','shell'*/]);

  grunt.registerTask('deploy','sends app to the server', ['sshexec:stop','sshexec:remove',
    'sshexec:make','sshexec:change','sftp:deploy','sshexec:removes','sshexec:start']);

  grunt.registerTask('start', 'start remote', ['sshexec:start']);

  grunt.registerTask('stop', 'stop remote', ['sshexec:stop']);

  grunt.registerTask('test','unit tests',['nodeunit']);

  grunt.registerTask('version',['bumpup']);

  grunt.registerTask('tag',['shell']);

};