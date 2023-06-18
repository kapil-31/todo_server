import { AppRouteBaseInterface } from '.'
import AnalyticsController from '../controllers/AnalyticsController'

const Controller = new AnalyticsController()
export const AnalyticsRoutes: AppRouteBaseInterface = {
  prefix: '/api/v1/analytics',
  routes: [
    {
      method: 'get',
      url: '/',
      handler: Controller.getAnaylicts,
    },
  ],
}
