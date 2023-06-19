import Board, { BoardBaseDocument } from '../models/board'
import { asyncHandler } from '../middleware/asyncHandler'
import { JSONResponse, removeWhitSpace } from '../helpers/helpers'
import ErrorResponse from '../utils/error_handler'
import { BoardModelQuery } from '../queries/board.model.query'
import CrudServices from '../services/CrudServices'

export default class BoardController {
  json_res: JSONResponse = new JSONResponse()
  CrudServices: CrudServices = new CrudServices(Board)
  query: BoardModelQuery = new BoardModelQuery()
  __construct() {
    this.json_res = new JSONResponse()
    this.CrudServices = new CrudServices(Board)
    this.query = new BoardModelQuery()
  }
  getTodos = asyncHandler(async (req, res, next) => {
    try {
      let data = await this.CrudServices.aggregrate(
        this.query.fetchTodosInBoardArregrationQuery()
      )
      return this.json_res.success(res, 'todos', data)
    } catch (e) {
      next(e)
    }
  })
  create = asyncHandler(async (req, res, _) => {
    // check if board already there for this project only
    let board: BoardBaseDocument[] = await this.CrudServices.get()
    if (board.length) {
      return this.json_res.success(res, 'succes', {})
    }
    let dummy = [
      {
        status: 'completed',
        name: 'Completed',
        position: 2,
      },
      {
        status: 'pending',
        name: 'Pending',
        position: 1,
      },
      {
        status: 'todo',
        name: 'Todo',
        position: 0,
      },
    ]

    const data = await this.CrudServices.insertMany(dummy)
    return this.json_res.success(res, 'sucess', data)
  })
  update = asyncHandler(async (req, res, next) => {
    try {
      let _id = req.params.boardId
      this.CrudServices.updateOne({
        filterQuery: {
          _id,
        },
        updateQuery: req.body,
      })
      return this.json_res.success(res, 'success', {})
    } catch (e) {
      next(new ErrorResponse('Error in updating Board Name', 204))
    }
  })
  remove = asyncHandler(async (req, res, next) => {
    try {
      await this.CrudServices.delete(req.params.boardId)
      return this.json_res.success(res, '', {})
    } catch (e) {
      next(e)
    }
  })
}
