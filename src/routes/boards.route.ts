import { NextFunction, Request, Response } from 'express'
import BoardController from '../controllers/BoardController'
import { IRouteType } from './bind.rotutes'
import { body } from 'express-validator'
// import from '../controllers/todoController'

const controller = new BoardController()

export const boardRotues: IRouteType[] = [
  {
    method: 'get',
    url: '/all',
    handler: controller.getTodos,
    auth: 'open',
  },
  {
    method: 'post',
    url: '/',
    handler: controller.create,
    auth: 'open',
  },
  {
    method: 'put',
    url: '/:boardId',
    handler: controller.update,
    auth: 'open',
  },
  {
    method: 'delete',
    url: '/:boardId',
    handler: controller.remove,
    auth: 'open',
  },
]
