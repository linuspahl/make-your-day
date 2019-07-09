# Packages overview

## Frontend & Backend

- eslint - Analyses the code for stylistic and coding errors, based on the .eslintrc.
  Can optionally be used with the cli e.g. `yarn run eslint example/target.js`.
- prettier - Code formatter, can be combined with eslint, by using eslint-plugin-prettier and eslint-config-prettier. https://prettier.io/docs/en/eslint.html
- eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
- eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier.

## Frontend

- webpack - Will bundle the react app, allows us to split the code
- webpack-cli - Allows us to use webpack with the cli. Needed to run webpack as a yarn script
- webpack-dev-server - Only needed for development, will watch for changes and automatically create a new bundle
- webpack-merge - Allows us to split the webpack config in multiple files
- html-webpack-plugin - The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
- copy-webpack-plugin - Needed to copy e.g. public files like the favicon
- compression-webpack-plugin - Used to compress bundle with gzip
- uglifyjs-webpack-plugin / babel-preset-minify - will minify the JS Code.
- typescript - to type js code
- ts-transform-graphql-tag - needed to import gql type definitions.
- ts-jest - TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
- @types/\* - types for specified libs, needed for TypeScript usage
- awesome-typescript-loader - helps Webpack compile your TypeScript code using the TypeScript’s standard configuration file.
- soucrce-map-loader - uses any sourcemap outputs from TypeScript to inform webpack when generating its own sourcemaps. This will allow you to debug your final output file as if you were debugging your original TypeScript source code.
- eslint-plugin-react - for react specific eslint rules
- eslint-plugin-jest - for jest specific eslint rules
- jest - to test the js code.
- react-test-renderer - Needed for the components tests. A faster alternative to ReactDOM.
- graphql - JavaScript reference implementation for GraphQL
- apollo-provider - provides query and mutation components for react
- apollo-boost - provides usefull tools when working with apollo
- cross-fetch - needed to test apollo client with yarn
- react-router-dom - DOM bindings for React Router.
- style-loader - allows import of stylesheets
- css-loader - interprets @import and url() like import/require() and will resolve them.
- file-loader - webpack file loader, needed to import e.g. webfonts

## Backend

- @babel/node - CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.
- @babel/core - will create browser friendly javascript
- @babel/preset-env - preset that allows us to use the latest JavaScript without needing to manage which syntax transforms are needed by your target environment.
- babel-eslint - allows us to lint all valid Babel code.
- nodemon - will restart babel-node on code changes
- dotenv - allows us to store sensetive or envoronment specific data in an env file. The file is included in the gitignore.
- express - Node.js web application framework that provides a set of features for web and mobile applications.
- cors - for express server cors settings
- sequelize - database orm for postgres db
- sequelize-cli - To run sequelize from the cli.
  Needed for the database setup
- pg - needed for the postgres database connection
- crypto - crypto lib, used to create the user auth token
- bcrypt-nodejs - needed to compare the users password input with the password hash
- graphql - JavaScript reference implementation for GraphQL
- apollo-server - GraphQL Server
