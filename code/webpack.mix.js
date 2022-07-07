const mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js')
	.vue()
	.postCss('src/css/app.css', 'public/css', [
		require('postcss-import'),
		require('tailwindcss')
	])
	.alias({'@': 'src/js'});
