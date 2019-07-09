# Getting started

Provides all information needed to start the development for frontend and backend.

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

## Run the project (local)

### Frontend

- Enter the frontend directory with your cli
- For development run `yarn start` to start the webpack dev server. And open: [http://localhost:8080](http://localhost:8080)

### Backend

- Enter the backend directory with the cli
- For development run `yarn start` to start the node backend. Thanks [nodemon](https://nodemon.io/), the node instance will automatically restart on changes.

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

## Deployment

Currently there is no automated deployment. But there are some yarn scripts, that will help you deploying changes.

### Frontend

- First connect to the server and open the frontend directory.
- Make sure you've installed all dependecies by running `yarn install`
- For production run `yarn build` to create an optimized version of the app in the `productionBuild` directory.
- Make sure to restart the webserver.

Troubleshooting
When you are receiving a memory related error, while building, like "JavaScript heap out of memory", you can try to temporarily increas the node memory limit:
`NODE_OPTIONS="--max_old_space_size=8096"`

### Backend

- First connect to the server and open the backend directory.
- Stop the process manager pm2 with `yarn stopProd`
- Make sure you've installed all dependecies by running `yarn install`
- Make sure you've run all new migrations with `yarn migrate`
- Make sure you've run all new seeds with `yarn seed`
- Start the backend with `yarn startProd`

Troubleshooting
When the backend is not starting / behaving correctly, you can have a look at the pm2 logs with `yarn logProd`
