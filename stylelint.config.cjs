module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
	ignoreFiles: ['node_modules/*', 'src/assets/**', 'build/**', 'src/lib/styles/normalise.css'],
	customSyntax: 'postcss-html'
};
