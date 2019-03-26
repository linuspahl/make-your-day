// Module resolvers, needed for webpack bundling and jest testing.
// Allows usage of shorter import paths.
// If you change a path here, you need to adjust the tsconfig as w-ell.
// E.g. 'src/components/Component' can be be 'components/Component'

module.exports = ['./src', './node_modules']
