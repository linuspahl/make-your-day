import express from 'express'
import cors from 'cors'
import config from '../config/config'

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

// listen on configured port
app.listen(config.apiPort, () => {
  console.log(`The backend has started on: ${config.apiHost}:${config.apiPort}`)
})
