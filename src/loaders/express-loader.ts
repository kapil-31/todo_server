import express, { NextFunction, Request, Response, Express } from 'express'
import * as fs from 'fs'
import ErrorResponse from '../utils/error_handler'
import errorHandler from '../utils/error_response'
import { todoRoutes } from '../routes/tasks.route'
import { bindRoute } from '../routes/bind.rotutes'
import { boardRotues } from '../routes/boards.route'
import cors from 'cors'
const app: Express = express()
export default () => {
  app.disable('x-powered-by')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  bindRoute(app, 'task', todoRoutes)
  bindRoute(app, 'board', boardRotues)
  app.use(errorHandler)
  app.use((_req: Request, _res: Response, next: NextFunction) =>
    next(new ErrorResponse('Route not found', 404))
  )
  app.use(errorHandler)

  return app
}
