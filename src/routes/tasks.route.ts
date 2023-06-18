import { NextFunction, Request, Response } from 'express'
import { param, validationResult } from 'express-validator'
import { isObjectId, validate } from '../helpers/helpers'
import { IRouteType } from './bind.rotutes'
import TaskController from '../controllers/TaskController'
import { AppRouteBaseInterface } from '.'

const taskController = new TaskController()

export const todoRoutes: AppRouteBaseInterface = {
  prefix: '/api/v1/task',
  routes: [
    {
      method: 'put',
      url: '/update-position',
      handler: taskController.updatePosition,
    },
    {
      method: 'post',
      url: '/:boardId/create',
      handler: taskController.create,
    },
    {
      method: 'put',
      url: '/:taskId',
      middleware: [
        param('taskId').custom((value) => {
          if (!isObjectId(value)) {
            return Promise.reject('Invalid board Id')
          } else return Promise.resolve()
        }),
        validate,
      ],
      handler: taskController.update,
    },
    {
      method: 'put',
      url: '/duplicate/:boardId/:taskId',
      middleware: [
        param('taskId').custom((value) => {
          if (!isObjectId(value)) {
            return Promise.reject('Invalid board Id')
          } else return Promise.resolve()
        }),
        param('boardId').custom((value) => {
          if (!isObjectId(value)) {
            return Promise.reject('Invalid board Id')
          } else return Promise.resolve()
        }),
        validate,
      ],
      handler: taskController.duplicateTask,
    },

    {
      method: 'delete',
      url: '/:id',
      handler: taskController.delete,
    },
  ],
}
