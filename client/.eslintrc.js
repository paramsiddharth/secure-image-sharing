module.exports = {
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'env': {
		'browser': true,
		'node': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'eol-last': [
			'error',
			'never'
		],
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off'
	}
};