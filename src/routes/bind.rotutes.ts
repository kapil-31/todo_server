import { Router, Express, RouterOptions, NextFunction } from 'express'

export const bindRoute = function (
  app: Express,
  baseUrl: string,
  routes: IRouteType[]
) {
  var router = Router()
  routes.forEach((route, index: number) => {
    let middleware: any = []
    if (route.middleware) middleware = [...route.middleware, ...middleware]

    // @ts-ignore
    router[route.method](route.url, middleware, route.handler)
  })
  app.use(baseUrl, router)
}

export interface IRouteType {
  method: string
  url: string
  middleware?: any[]
  handler: any
  auth?: string
}
