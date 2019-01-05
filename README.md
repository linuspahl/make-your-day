# make-your-day
Web app (Node + React) to extend my knowledge about the used technologies. This app will help me to measure my daily goals.


## Setup the project

### Global dependencies
* yarn - package manager for all backend and frontend dependencies.

### Frontend
* Enter frontend directory with the cli
* Run `yarn install` to install all frontend dependencies

### Backend
* Enter backend directory with the cli
* Run `yarn install` to install all frontend dependencies
* Create a postgres database manually (not yet part of the provisioning)
* Run `cp ./config/.env.sample ./config/.env` add the required attributes in the created file
* Run `yarn createDatabase` to initially create the database tables.

## Run the project

### Frontend
* Enter the frontend directory with the cli
* For development run `yarn start` to start the webpack dev server. The browser will automatically open the frontend.
* For production run `yarn build` to create an optimized version of the app in the `dist` directory.

### Frontend
* Enter the backend directory with the cli
* For development run `yarn start` to start nodemon / babel-node.
* For production run `yarn startProd` to run babel-node directly. The node instance will not restart on changes.

## Testing

### Frontend
We are using Jest for unit and snapshot tests. You can run all tests with `yarn test`.
Before each commit, you should check the code coverage with `yarn test --coverage`
You'll find the test suit setup in `config/test`.
A common component test case is to check if the component renders correctly.
You should use `react-test-render/shallow` for this.

## Packages overview

### Frontend & Backend
Dev packages
* eslint - Analyses the code for stylistic and coding errors, based on the .eslintrc.
Can optionally be used with the cli e.g. `yarn run eslint example/target.js`.
* prettier - Code formatter, can be combined with eslint, by using eslint-plugin-prettier and eslint-config-prettier. https://prettier.io/docs/en/eslint.html
* eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
* eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier.
* @babel/core - will create browser friendly javascript
* @babel/preset-env - preset that allows us to use the latest JavaScript without needing to manage which syntax transforms are needed by your target environment.
* babel-eslint - allows us to lint all valid Babel code.

### Frontend
* webpack - Will bundle the react app, allows us to split the code
* webpack-cli - Allows us to use webpack with the cli. Needed to run webpack as a yarn script
* webpack-dev-server - Only needed for development, will watch for changes and automatically create a new bundle
* webpack-merge - Allows us to split the webpack config in multiple files
* html-webpack-plgin - The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
* babel-loader - allows transpliling JavaScript files using Babel and webpack
* @babel/preset-react - preset needed to transform the react code.
* babel-plugin-styled-components - will create readable names for the styled components.
* uglifyjs-webpack-plugin / babel-preset-minify - will minify the JS Code.
* jest - to test the js code.
* babel-jest - to transform our code inside of the test environment.
* react-test-renderer - Needed for the components tests. A faster alternative to ReactDOM.

## Backend
* @babel/node - CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.
* nodemon - will restart babel-node on code changes
* dotenv - allows us to store sensetive or envoronment specific data in an env file. The file is included in the gitignore.
* express - Node.js web application framework that provides a set of features for web and mobile applications.
* cors - for express server cors settings
* pg - needed for the postgres database connection


## Best Practices:
* We are trying to avoid global dependencies.
The package manager should be the only global dependency.
This will make the setup easier and reduce potential errors.
It will affect e.g. the setup of the VS Code node debugging.
* All vcs commits should start with the affected project parts (FE or BE, or both).
E.g: FE: Setup yarn package.json
* React components naming convention:
Use `Component/Component.js` instead of `Component/index.js`. It looks redundant at first, but will a lot when switching between components, during the development.
* Imports should be grouped by e.g. Components, Libraries, Store related actions, etc. Have a look at the `App.js` for a real example.
