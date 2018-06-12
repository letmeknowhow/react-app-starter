var Env = require('./env');
var resolve = Env.resolve;

module.exports = {
	common: {
		extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
		alias: {
			'component': resolve('src/components'),
			'modules': resolve('src/modules'),
			'api': resolve('src/api'),
			'common': resolve('src/common'),
			'constants': resolve('src/constants'),
		}
	},
	production: {},
	qa: {},
	dev: {},
	fe: {}
};