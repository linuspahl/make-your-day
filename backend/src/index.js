// Backend index file
// Initially we are creating an express server with a connected apollo server
import expressServer from './core/expressServer'
import config from '../config/config'

// Listen on configured port
expressServer.listen(config.apiPort, () => {
  console.log(`The backend started on: ${config.apiHost}:${config.apiPort}`)
})
