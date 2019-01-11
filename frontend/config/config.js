// Main app config file
// Will provide all env vars

export default {
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
  isDevEnv: process.env.CURRENT_ENV === 'development',
}
