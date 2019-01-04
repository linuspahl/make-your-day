// Import .env file
require('dotenv').config({ path: './config/.env' })

export default {
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
  isDevEnv: process.env.CURRENT_ENV === 'development',
}
