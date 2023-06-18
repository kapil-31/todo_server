import { ITodoModel, TodoBaseModel, Todos } from '../models/todos'
import { asyncHandler } from '../middleware/asyncHandler'
import { JSONResponse } from '../helpers/helpers'
import ErrorResponse from '../utils/error_handler'
import CrudServices from '../services/CrudServices'
import moment from 'moment'

export default class TaskController {
  json_res: JSONResponse = new JSONResponse()
  CrudServices: CrudServices = new CrudServices(Todos)
  __constructor() {
    this.json_res = new JSONResponse()
    this.CrudServices = new CrudServices(Todos)
  }

  create = asyncHandler(async (req, res, next) => {
    try {
      const { content } = req.body
      const board = req.params.boardId

      let tasks = await Todos.find({ board }).sort('-position')
      let position = 0
      if (tasks.length) {
        position = tasks[0].position + 1
      }

      let todo = await this.CrudServices.create({
        content,
        board,
        position,
      })

      return this.json_res.success(res, 'success', todo)
    } catch (e) {
      next(e)
    }
  })
  delete = asyncHandler(async (req, res, next) => {
    try {
      await this.CrudServices.delete(req.params.id)
      return this.json_res.success(res, 'scuess', {})
    } catch (e) {
      next(e)
    }
  })
  update = asyncHandler(async (req, res, next) => {
    try {
      await this.CrudServices.updateOne({
        filterQuery: {
          _id: req.params.taskId,
        },
        updateQuery: req.body,
      })
      return this.json_res.success(res, 'success', {})
    } catch (e) {
      next(new ErrorResponse('Error in updating', 204))
    }
  })
  duplicateTask = asyncHandler(async (req, response, next) => {
    let { taskId, boardId } = req.params
    try {
      //
      let result: TodoBaseModel[] = await this.CrudServices.get({
        board: boardId,
      })
      let duplicatIndex = result.findIndex((item) => item._id.equals(taskId))
      let { content, position, board, id } = result[duplicatIndex]
      let cpdoc = {
        content,
        position,
        board,
      }
      //@ts-ignore
      result.splice(duplicatIndex, 0, cpdoc)
      console.log(result)

      let duplicatObj = result.map((item, index) => {
        let returnItem: any = {}
        if (!item._id) {
          returnItem.insertOne = {
            document: {
              content: item.content,
              position: index,
              board: item.board,
            },
          }
        } else {
          returnItem = {
            updateOne: {
              filter: { _id: item._id },
              update: {
                position: index,
              },
            },
          }
        }
        console.log(returnItem)
        return returnItem
      })

      let res = await this.CrudServices.bulWrite(duplicatObj)
      return this.json_res.success(response, 'sucess', {
        newId: Object.values(res.insertedIds)[0],
      })
    } catch (e) {
      next(e)
    }
  })
  updatePosition = asyncHandler(async (req, res, next) => {
    const {
      resourceList,
      destinationList,
      resourceSectionId,
      destinationSectionId,
    } = req.body

    try {
      console.log(destinationSectionId, resourceList)
      console.log({
        resourceList,
        destinationList,
      })
      if (resourceSectionId !== destinationSectionId) {
        console.log(resourceSectionId, destinationSectionId)
        const objToUpdate = destinationList.map((item: any, key: number) => ({
          updateOne: {
            filter: { _id: item._id },
            update: {
              name: item.name,
              board: destinationSectionId,
              completedAt: new Date(),
              position: key,
            },
          },
        }))
        await this.CrudServices.bulWrite(objToUpdate)
      }
      const objToUpdate = resourceList
        .reverse()
        .map((item: any, key: number) => ({
          updateOne: {
            filter: { _id: item._id },
            update: {
              name: item.name,
              board: resourceSectionId,
              completedAt: null,
              position: key,
            },
          },
        }))
      await this.CrudServices.bulWrite(objToUpdate)
      return res.send('success')
    } catch (e) {
      next(e)
    }
  })
}
