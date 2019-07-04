# make-your-day

Web app (Node + React) to extend my knowledge about the used technologies. This app will help me measuring e.g. my expenses.

## Setup the project

### Global dependencies

- [yarn](https://yarnpkg.com/lang/en/docs/install) - package manager for all backend and frontend dependencies.

### Frontend

- Enter frontend directory with the cli
- Run `yarn install` to install all frontend dependencies
- Run `cp ./config/.env.sample ./config/.env` add the required attributes in the created file

### Backend

- Enter backend directory with the cli
- Run `yarn install` to install all frontend dependencies
- Create a postgres database manually (not yet part of the projekt)
- Run `cp ./config/.env.sample ./config/.env` add the required attributes in the created file
- Run `yarn migrate` to run all migrations and create the database tables.
- Run `yarn seed`. This will, amongst other things, create an initial user with the credentials:

```
  username: Admin
  password: admin
```

## Run the project

### Frontend

- Enter the frontend directory with your cli
- For development run `yarn start` to start the webpack dev server. And open: [http://localhost:8080](http://localhost:8080)
- For production run `yarn build` to create an optimized version of the app in the `productionBuild` directory.

#### Testing

We are using Jest and `@testing-library/react` for unit tests. You can run all tests with `yarn test`.
Before each commit, you should check the code coverage with `yarn test --coverage`
You'll find the test suit setup in `config/test`.
A common component test case is to check if the component renders correctly.
You should use `react-test-render/shallow` for this.

When testing a component with many props multiple props,
extract them to an object and just modify the related prop for each test.

What to test?
We try to test what's important for the user. Our testing library (@testing-library/react) supports this approach.
E.g. when testing the navigation, we could test, if the nav items are getting rendered and if they redirect the user to the new route, on click.
This would look like:

```
  const { getByText } = render(<Navigation/>)
  expect(getByText('Settings')).toBeinTheDocument()
```

How to write component tests (in this example a form component)
Have a look at the existing tests, for more detailed examples regarding the described scenarios.

1. Render the component
   `const { getByText, getByLabelText } = render(<FormComponent handleSubmit={submitStub}/>)`
   If you need access to the router / theme or the apollo provider, have a look at the testUtils file (especially `renderWithAppRoot()`).
2. If needed, interact with the component, for example by fillign out an input:
   `fireEvent.click(getByText('Erstellen'), leftClickOption)`
   or by clicking on a button:
   ```
    fireEvent.change(getByLabelText('Einheit'), {
      target: { value: categoryCreate.unit },
    })
   ```
   Its important to know, when testing (or mocking) an async action,
   like fetching and submiting data, use an `async test(): Promise<void> {}` function
   in combination with `await wait()`.
   Sometimes it's not obvious a component / thirs party library is perfoming some async actions.
3. Check for the desired event. If possible by testing, what is important for the user.
   ```
    expect(getByText('Important Text for the user')).toBeInTheDocument()
   ```
   In the context of a form submit, we would pass a submit stub as a prop to the form component
   and test the stub, after submitting the form.
   ```
    expect(submitStub).toBeCalledTimes(1)
    expect(submitStub).toBeCalledWith({ username: 'Admin' })
   ```

How to debug Query and Mutation components.
Needs an own section, because it can be very tricky. The context: When testing a Query component, we need to provide the used schema and a matching api request / response mock. The tricky part is, the request / response mock and the schema have to match in every detail.Does not sound very hard, but zou get no detailed info, about the root of the problem.
When logging the error, the Query compoinent throwes, it contain something like

```
  networkError: Error: No more mocked responses for the query: query GetCategory
  ($id: Int!) {
    getCategory(id: $id) {
      id
      name
    }
  }
  , variables: {"id":1}
```

So here's how to debug in this situation:

1. Is the actual Query component using variables?
   In this case, are they visible in the error log, with the exact amount and content?
   Are the provided variables having the correct types compared to the provided schema?

2. Is the mocked response structure identical to the schema? It will throw an error, when there are to many or not enough. If you have no other option, it is woth it, to copy the attibutes in the schema an use them in the mock, with some manually created data.

3. Are the mocked query (e.g. GetCategory) and the actually used query identcal?

Fixtures
For a lot tests we are using fixtures. All fixtures are stored in the store directory.
We try to use as less "hardcoded" data in the tests as possible.
E.g. when testing a Mutation component, you need to provide an id for the specific entry, you want to update delete.
And you will have to compare the result against some data. Try to use the same fixture for the input (id) and output (mutation result).
This way we are very flexible when it comes to editing the fixtures.

#### Linting

We are using Eslint for the linting.
Before each commit, you should check the linting with `yarn lint`.
For the best development experiennce, you should install the Prettier Extension for your IDE.

### Backend

- Enter the backend directory with the cli
- For development run `yarn start` to start the node backend. Thanks [nodemon](https://nodemon.io/), the node instance will automatically restart on changes.
- For production run `yarn startProd`. This will start [pm2](http://pm2.keymetrics.io/) a production process manager for Node.js. The node instance will not restart on changes.

#### Creating seeds

Sometimes it makes sense to insert some seed data, e.g. to have an initial user.
Like mentioned in the setup part, you can insert all existing seeds with `yarn seed`.
To create a new seed run `yarn sequelize seed:generate --name seed-name`

#### Creating migrations

Like mentioned in the setup part, you can run all migrations with `yarn migrate`.
To create a new migration run `yarn sequelize migration:generate --name migration-name`
To revert the last migration run `yarn migrateDown`
Sequelize is also able to create the database, based on the model definitions. You can run this with `yarn createDatabse`. It can't replace the the migrations,
but sometimes it is nice to see how the database would look like, when it's based on the model definitions.

#### Linting

We are using Eslint for the linting.
Before each commit, you should check the linting with `yarn lint`.
For the best development experiennce, you should install the Prettier Extension for your IDE.

## Project structure

### Frontend

- ./config
  Contains all kind of config files, e.g. for weback, testing, env vars
- ./src
  Contains the app. Some could argue that e.g. the theme or static params in the config are also a part of the app source, but we prefer to split it this way.

- ./src/index.html
  App html index file. Contains nothing, but the meta data and a root element to
  render the React App
- ./src/index.tsx
  App JS index file. Will render the AppRoot and import some global styles.

- ./src/AppRoot
  Directory to bundle all functionalities needed for the app base.
  Like the ApolloProvider, ThemeProvider and Routes.

- ./src/containers
  Contains all top level components. Each component represents a route, included in the AppRoot Routes.
- ./src/components
  Contains all kind of child components used by the containers.
- ./src/shared
  Contains all kind of generic component used multiple times. E,g, a button or loading spinner component.
- ./src/store
  Represents the app store in an object oriented way. Contains all graphql mutation / queries to communicate with the backend. Usually contains an update file, needed to update the store correctly after an action.
  Also contains the object type definitions and some fixtures, needed for the tests.
- ./src/globalStyles
  We try to avoid global styles, but sometimes it's needed, e.g. for the reset CSS file. Gets included by the AppRoot
- ./src/utils
  Some helpful utility functions, needed multiple times in the project.

### Backend

- ./config
  Contains all kind of config files, e.g. the env vars and the sequelize cli.
- ./migrations
  Contains all migrations.
- ./seeds
  Contains all seeds, like the initial user.

- ./src
  Contains the app.
- ./src/index.js
  The app index file. Will initiate the express server.
- ./src/core
  Comparable to the frontend AppRoot. Contains everything needed for the base app, like the apollo and express server and the Sequelize database connection.
- ./src/models
  Classical, object orientated model and model relation definitions.
- ./src/resolvers
  Contains resolvers for all possible backend / api actions (mutations / queries).

## Best Practices

- We are trying to avoid global dependencies.
  The package manager should be the only global dependency.
  This will make the setup easier and reduce potential errors.
  It will affect e.g. the setup of the VS Code node debugging.
- All vcs commits should start with the affected project parts (FE or BE, or both).
  E.g: FE: Setup yarn package.json
- To prevent most "Cannot read property 'foo' of undefined" Errors, you should always define an empty array as default value, e.g. for parameters:

```

function bar(arrayOfItems = []) {..}

```

or deconstruction:

```

const {arrayOfItems = []} = this.props;

```

### Frontend

- React components naming convention:
  Use `Component/Component.js` instead of `Component/index.js`. It looks redundant at first, but will help a lot when switching between components, during the development.
- We try to structure the imports. The definition of an import type is very subjective, but we are trying to seperate the imports by:
  // libraries - all dependencies installed with yarn
  // components - all components in the `src` directory
  // interfaces - all TypeScript interfaces
  // graphql - all actions in the `store` driectory like grapqhl queries and mutations
- Example React component structur:

```

export default class ExampleComponent extends React.Component {
// The first part is the constructur (when needed)
// We'll bind this to all functions which need access to the component context
// This will keep the constructor clean
public constructor(props: Props) {
super(props)

    this.state = {}

    this.exampleStateChange = this.exampleStateChange.bind(this)

}

// Component lifecycle methods
componentDidMount() {}

// Render
public render()()() {}

// Other functions should be placed after the render function
// This increases the readability
exampleStateChange() {}
}

```

- Component module export:
  When the component is just a function, make sure you still use a named export like

```

const ComponentName = props => {}
export const ComponentName

```

and not

```

export default props => {}

```

This makes debugging easier, e.g. with the React Devtools

- Accessibility
  Most common best practices are easy to check with e.g. the browser extension axe.
  But still always check if tab navigation works.
  Each page should have one main landmark. (role="main")

## Packages overview

### Frontend & Backend

- eslint - Analyses the code for stylistic and coding errors, based on the .eslintrc.
  Can optionally be used with the cli e.g. `yarn run eslint example/target.js`.
- prettier - Code formatter, can be combined with eslint, by using eslint-plugin-prettier and eslint-config-prettier. https://prettier.io/docs/en/eslint.html
- eslint-plugin-prettier - Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
- eslint-config-prettier - Turns off all rules that are unnecessary or might conflict with Prettier.

### Frontend

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

### Backend

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

```

```
