import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import JasmineReporter from 'jasmine-spec-reporter';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';

const $ = loadPlugins();
const sync = browserSync.create();

const files = {
  specs: 'specs/**/*.js',
  client: {
    js: 'src/client/**/*.js',
    html: 'src/client/index.html'
  },
  server: {
    js: 'src/server/**/*.js'
  }
};

/*******************************************************************************
* Tasks
*******************************************************************************/
gulp.task('clean', () => {
  return gulp.src('dist/', { read: false })
    .pipe($.clean());
});

gulp.task('lint', () => {
  return gulp.src([files.client.js, files.server.js, files.specs])
    .pipe($.cached('lint'))
    .pipe($.eslint({
      extends: 'eslint:recommended',
      ecmaFeatures: {
        modules: true
      },
      env: {
        browser: true,
        es6: true,
        jasmine: true,
        node: true
      },
      rules: {
        'no-console': 0
      }
    }))
    .pipe($.eslint.format());
});

gulp.task('test', ['lint'], () => {
  return gulp.src(files.specs)
    .pipe($.cached('test'))
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.sourcemaps.write())
    .pipe($.jasmine({
      reporter: new JasmineReporter()
    }));
});

gulp.task('html', () => {
  return gulp.src(files.client.html)
    .pipe($.cached('html'))
    .pipe(gulp.dest('dist/public/'));
});

gulp.task('js:client', () => {
  return browserify('src/client/index.js', { debug: true })
    .transform(babelify, {
      presets: ['es2015']
    })
    .bundle()
    .on('error', (err) => {
      console.error(err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/public/'));
});

gulp.task('js:server', () => {
  return gulp.src(files.server.js)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['js:client', 'js:server', 'html'], () => {
  sync.init({
    proxy: 'localhost:3000',
    port: 5000
  });
  
  gulp.watch(files.client.js, ['js:client']);
  gulp.watch(files.server.js, ['js:server']);
  gulp.watch(files.client.html, ['html']);
  gulp.watch('dist/public/**/*').on('change', sync.reload);
});

gulp.task('serve', () => {
  $.nodemon({
    script: 'dist/index.js',
    watch: 'dist/index.js',
    execMap: {
      js: 'node --harmony'
    }
  });
});

gulp.task('default', $.sequence('clean', 'lint', 'watch', 'serve'));
