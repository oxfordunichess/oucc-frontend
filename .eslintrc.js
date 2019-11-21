module.exports = {
    "env": {
        "browser": true,
		"es6": true,
		"node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
			"tab",
			{
				"SwitchCase": 1
			}
        ],
        "linebreak-style": [
            "error",
            "windows"
		],
		"no-unused-vars": "off",
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};