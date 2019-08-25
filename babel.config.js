module.exports = function(api){
	api.cache(true);

	return {
		plugins: [
			['babel-plugin-add-module-exports']
		],
		presets: [
			'@babel/preset-env'
		]
	}
}
