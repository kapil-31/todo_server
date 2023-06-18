import dbConnectLoader from './db-loader'
import expressLoader from './express-loader'

export default async () => {
  // load database;
  await dbConnectLoader()
  console.log('MongoDB has been Initialized')
  return expressLoader()
}
