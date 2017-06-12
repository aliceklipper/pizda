/*
 eslint
 no-magic-numbers: off,
 import/no-commonjs: off,
 import/unambiguous: off,
 fp/no-mutation: off
 */

module.exports = {
    processors: ['stylelint-processor-styled-components'],
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
    },
    syntax: 'scss',
};
