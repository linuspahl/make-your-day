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
const corsSettings = { optionsSuccessStatus: 200 }
// During the development we want to send the Header `Access-Control-Allow-Origin: *`
// This will allow every local machine to access the backend
// For production, we wnat to limit the allowed origin to our related frontend
if (!config.isDevEnv) {
  corsSettings.origin = `${config.host}:${config.port}`
}
app.use(cors(corsSettings))

// Connect with apollo server
apolloServer.applyMiddleware({
  app,
})

export default app
