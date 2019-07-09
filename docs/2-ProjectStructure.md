# Project structure

## Frontend

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

## Backend

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
