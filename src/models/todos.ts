import mongoose, { Document, Query, QueryOptions, Types } from 'mongoose'
import { BoardBaseDocument } from './board'

const Todo = new mongoose.Schema<TodoBaseModel, ITodoModel>(
  {
    content: {
      type: String,
      default: '',
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'boards',
    },
    position: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Todos = mongoose.model('todos', Todo)

export { Todos }

export interface ITodoModel {
  content: string
  board: Types.ObjectId | Record<string, unknown>
  position: number
}

export interface TodoBaseModel extends ITodoModel, Document {
  board: BoardBaseDocument['_id']
}
