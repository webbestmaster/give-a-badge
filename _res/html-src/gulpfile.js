const gulp = require('gulp');

const plugin = require('gulp-load-plugins')();

const browserSync = require('browser-sync').create();

// Sass
gulp.task('sass', function() {
    return gulp
        .src('src/sass/app.scss')
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sass().on('error', plugin.notify.onError('***SASS***: <%= error.message %>')))
        .pipe(plugin.autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(plugin.concat('app.css'))
        .pipe(plugin.csso())
        .pipe(plugin.rename({suffix: '.min'}))
        .pipe(plugin.sourcemaps.write('../css'))
        .pipe(gulp.dest('dist/assets/css'));
});

// Stylus
gulp.task('stylus', function() {
    return gulp
        .src('src/stylus/*.styl')
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.stylus().on('error', plugin.notify.onError('*** STYLUS ***: <%= error.message %>')))
        .pipe(plugin.autoprefixer({browsers: ['last 10 versions'], cascade: false}))
        .pipe(plugin.concat('app.css'))
        .pipe(plugin.sourcemaps.write('../css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

// Pug
gulp.task('pug', function() {
    return gulp
        .src('src/pug/pages/*.pug')
        .pipe(plugin.pug({pretty: true}))
        .on('error', plugin.notify.onError('*** PUG ***: <%= error.message %>'))
        .pipe(gulp.dest('dist'));
});

// JS
gulp.task('appjs', function() {
    return (
        gulp
            .src(['src/js/app.js'])
            .pipe(plugin.sourcemaps.init())
            .pipe(plugin.concat('app.js'))
            // .pipe(plugin.jsmin())
            // .pipe(plugin.rename({suffix: '.min'}))
            .pipe(plugin.sourcemaps.write('../js'))
            .pipe(gulp.dest('dist/assets/js'))
    );
});

// Libs
gulp.task('libs', function() {
    // JS libs
    var stream = gulp
            .src([
                'src/libs/svg4everybody/svg4everybody.min.js',
                'src/libs/perfectScrollbar/perfect-scrollbar.min.js',
                'src/libs/headroom/headroom.min.js',
                'src/libs/jquery/jquery-3.3.1.min.js',
            ])
            .pipe(plugin.concat('libs.min.js'))
            .pipe(gulp.dest('dist/assets/js')),
        // CSS libs
        stream = gulp
            .src(['src/libs/normalize-css/normalize.css', 'src/libs/perfectScrollbar/perfect-scrollbar.custom.css'])
            .pipe(plugin.sourcemaps.init())
            .pipe(plugin.csso())
            .pipe(plugin.concat('libs.min.css'))
            .pipe(plugin.sourcemaps.write('../css'))
            .pipe(gulp.dest('dist/assets/css'));

    // var stream = gulp.src('src/data/*.*')
    // .pipe(gulp.dest('dist/assets/data'));

    return stream;
});

// Reload
gulp.task('reload:pug', ['pug'], function(done) {
    return gulp.src('src/pug/**/*.*').pipe(browserSync.stream());
    done();
});

gulp.task('reload:js', ['appjs'], function(done) {
    return gulp.src('src/js/*.*').pipe(browserSync.stream());
    done();
});

gulp.task('reload:libs', ['libs'], function(done) {
    return gulp.src('src/libs/**/*.*').pipe(browserSync.stream());
    done();
});

// Assets
gulp.task('assets', function() {
    return gulp.src('src/assets/**/*.*').pipe(gulp.dest('dist/assets'));
});

// SVG
gulp.task('svg', function() {
    return gulp
        .src('src/assets/img/icons/**/*.svg')
        .pipe(plugin.svgmin({plugins: [{removeAttrs: {attrs: '(fill|stroke)'}}]}))
        .pipe(
            plugin.svgSprite({
                mode: {
                    symbol: {
                        sprite: 'sprite.svg', // имя файла
                        bust: false, // отключаем хэш в имени файла
                        dest: '', // отключаем файловую струтуру (по умолчанию, создаем в папке gulp.dest)
                    },
                },
            }),
        )
        .pipe(gulp.dest('dist/assets/img'));
});

// Watch
gulp.task('watch', function() {
    browserSync.init({
        server: './dist',
        open: false,
    });

    plugin.watch('src/pug/**/*.pug', function(e, c) {
        gulp.start('reload:pug');
    });
    plugin.watch('src/js/*.js', function(e, c) {
        gulp.start('reload:js');
    });
    // plugin.watch("src/sass/**/*.scss", function (e, c) {
    //     gulp.start('sass');
    // });
    plugin.watch('src/stylus/**/*.styl', function(e, c) {
        gulp.start('stylus');
    });
    plugin.watch('src/libs/**/*.*', function(e, c) {
        gulp.start('reload:libs');
    });
});

// Clean
gulp.task('clean', function() {
    return del.sync(['dist']);
});

gulp.task('clean', function() {
    return del.sync(['dist']);
});

gulp.task('build-sass', ['assets', 'svg', 'pug', 'sass', 'libs', 'appjs']);
gulp.task('build-stylus', ['assets', 'svg', 'pug', 'stylus', 'libs', 'appjs']);

gulp.task('default', plugin.sequence(['build-stylus'], 'watch'));
