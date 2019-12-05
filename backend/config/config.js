// Import .env file
require('dotenv').config({ path: './config/.env' })

const {
  env: {
    API_HOST,
    API_PORT,
    API_SECRET,
    FRONTEND_HOST,
    FRONTEND_PORT,
    CURRENT_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_TIMEZONE,
  },
} = process

export default {
  apiHost: API_HOST,
  apiPort: API_PORT,
  apiSecret: API_SECRET,
  frontendHost: FRONTEND_HOST,
  frontendPort: FRONTEND_PORT,
  isDevEnv: CURRENT_ENV === 'development',
  db: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    timezone: DB_TIMEZONE,
  },
}
