const mix = require('laravel-mix');


mix.js('resources/js/user.js', 'public/js')
    .js('resources/sass/user.scss', 'public/css')

mix.browserSync('http://localhost:8000')
