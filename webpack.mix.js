const mix = require('laravel-mix');


mix.js('resources/js/user.js', 'public/js')
    .js('resources/js/admin.js', 'public/js')

mix.browserSync('http://localhost:8000')
