import mongoose, { Document } from 'mongoose'
import { schemaOptions } from './modelOptions'
import { Todos } from './todos'

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

BoardSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter())
    await Todos.deleteMany({ board: doc._id })
  }
)
export interface IBoardModel {
  name: string
  position: number
}

export interface BoardBaseDocument extends IBoardModel, Document {}
export default mongoose.model('boards', BoardSchema)
