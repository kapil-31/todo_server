import mongoose, { Document } from 'mongoose'
import { schemaOptions } from './modelOptions'

const BoardSchema = new mongoose.Schema<BoardBaseDocument, IBoardModel>(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
)
//@ts-ignore

BoardSchema.pre('deleteOne', { document: true, query: false }, (next) => {
  //@ts-ignore
  const id = this._id
  console.log('this', id)
  //@ts-ignore

  const _id = this.getQuery()['_id']
  console.log(_id)
  mongoose
    .model('todos')
    .deleteMany({ board: _id }, (err: any, result: any) => {
      if (err) {
        console.log(`[err] {err}`)
        next(err)
      } else {
        next()
      }
    })
})
export default mongoose.model('boards', BoardSchema)

export interface IBoardModel {
  name: string
  position: number
}

export interface BoardBaseDocument extends IBoardModel, Document {}
