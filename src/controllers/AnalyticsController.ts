import moment from 'moment'
import { JSONResponse } from '../helpers/helpers'
import { asyncHandler } from '../middleware/asyncHandler'
import BoardModel from '../models/board'
import { Todos } from '../models/todos'
import AnalayticsQuery from '../queries/analytics.query'
import CrudServices from '../services/CrudServices'

export default class AnalyticsController {
  BoardModelCrudService: CrudServices = new CrudServices(BoardModel)
  analyticsQuery: AnalayticsQuery = new AnalayticsQuery()
  responsehandler: JSONResponse = new JSONResponse()
  __contructor() {
    this.BoardModelCrudService = new CrudServices()
    this.analyticsQuery = new AnalayticsQuery()
    this.responsehandler = new JSONResponse()
  }
  getAnaylicts = asyncHandler(async (req, res, next) => {
    try {
      let resl = await Todos.find({
        createdAt: {
          // $in: [moment().startOf('day'), moment()],
          $gt: moment().startOf('day'),
          $lt: moment(),
        },
      })
      let result = await this.BoardModelCrudService.aggregrate(
        this.analyticsQuery.getAnalytiscc()
      )
      return this.responsehandler.success(res, 'succes', result)
    } catch (e) {
      next(e)
    }
  })
}
