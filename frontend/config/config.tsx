// Main app config file
// Will provide all env vars

interface Config {
  apiHost: string
  apiPort: number
  isDevEnv: boolean
}

const config: Config = {
  apiHost: process.env.API_HOST,
  apiPort: parseInt(process.env.API_PORT, 10),
  isDevEnv: process.env.CURRENT_ENV === 'development',
}

export default config