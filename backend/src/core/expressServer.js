// Express server setup
// Currently only needed for cors setting
// Everything else could be handles by the ApolloServer as well
import express from 'express'
import cors from 'cors'
import config from '../../config/config'
import apolloServer from './apolloServer'

// setup express app
const app = express()

// configure cors settings
app.use(
  cors({
    origin: `${config.frontendHost}:${config.frontendPort}`,
    // some legacy browsers (IE11) choke on 204
    optionsSuccessStatus: 200,
  })
)

// Connect with apollo server
apolloServer.applyMiddleware({
  app,
})

export default app
