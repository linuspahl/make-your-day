// Import .env file
require('dotenv').config({ path: './config/.env' })

export default {
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
  isDevEnv: process.env.CURRENT_ENV === 'development',
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
}
