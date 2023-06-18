require('dotenv').config()
const port = process.env.PROT || 8080
const env = process.env.NODE_ENV || 'development'
import appLoader from './loaders'

export const run = async () => {
  try {
    let app = await appLoader()
    console.log('Express package has been  Initialized')
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/v1`)
    })
  } catch (e) {
    console.log(e)
  }
}
