import mongoose from 'mongoose'
export default async (
  url: string = process.env.mongoURI as string,
  opts: mongoose.ConnectOptions = {}
) => {
  let dbOptions: any = {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  let db = await mongoose.connect(url, dbOptions)
  //@ts-ignore
  console.log('[DB] connected')
}
