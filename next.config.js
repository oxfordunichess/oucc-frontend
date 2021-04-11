const path = require('path');

const regexEqual = (x, y) => {
	return (
		x instanceof RegExp &&
		y instanceof RegExp &&
		x.source === y.source &&
		x.global === y.global &&
		x.ignoreCase === y.ignoreCase &&
		x.multiline === y.multiline
	);
};

module.exports = {
	webpack(config) {

		config.module.rules.push(...[
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			}
		]);

		config.resolve.alias = {
			...config.resolve.alias,
			...['assets', 'css', 'components', 'pages', 'utils'].reduce((acc, curr) => {
				acc[curr] = path.resolve(__dirname, 'src/' + curr + '/');
				return acc;
			}, {}),
			react: path.resolve('node_modules/react'),
			'~': path.resolve(__dirname, 'src/')
		};

		// Use to handle :globals in module.css
		const oneOf = config.module.rules.find(
			(rule) => typeof rule.oneOf === 'object'
		);
		if (oneOf) {
			const moduleCssRule = oneOf.oneOf.find(
				(rule) => regexEqual(rule.test, /\.module\.css$/)
				// regexEqual(rule.test, /\.module\.(scss|sass)$/)
			);
			if (moduleCssRule) {
				const cssLoader = moduleCssRule.use.find(({ loader }) =>
					loader.includes('css-loader')
				);
				if (cssLoader) {
					cssLoader.options.modules.mode = 'local';
				}
			}
		}
	
		return config;
	},
	images: {
		domains: [
			'oxfordunichess.github.io'
		]
	}
};