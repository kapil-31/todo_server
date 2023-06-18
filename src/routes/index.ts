// import all our routes ;

import { AnalyticsRoutes } from './analytics.routes'
import { IRouteType } from './bind.rotutes'
import { boardRotues } from './boards.route'
import { todoRoutes } from './tasks.route'

export interface AppRouteBaseInterface {
  prefix: string
  routes: IRouteType[]
}

export const AppRoutes = [boardRotues, todoRoutes, AnalyticsRoutes]
