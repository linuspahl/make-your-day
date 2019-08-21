// Module resolvers, needed for webpack bundling and jest testing.
// Allows usage of shorter import paths.
// If you change a path here, you need to adjust the tsconfig as well.
// E.g. 'src/components/Component' can be be 'components/Component'

const resolvers = ['./src', './node_modules', './config']

export default resolvers
