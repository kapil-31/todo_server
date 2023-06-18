import moment from 'moment'
import { run } from './server'

run()
process.on('unhandledRejection', (err, _) => {
  console.log('server error:' + err)
})
