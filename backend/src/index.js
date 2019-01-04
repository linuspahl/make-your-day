import express from 'express'
import config from '../config/config'

// setup express app
const app = express()

// listen on configured port
app.listen(config.apiPort, () => {
  console.log(`The backend has started on: ${config.apiHost}:${config.apiPort}`)
})
