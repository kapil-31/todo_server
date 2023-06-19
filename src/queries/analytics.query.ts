import moment from 'moment'

export default class AnalayticsQuery {
  getAnalytiscc = () => [
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        list: {
          $push: '$$ROOT',
        },
        completedTaskCount: {
          $sum: {
            $cond: {
              if: {
                $ne: ['$completedAt', null],
              },
              then: 1,
              else: 0,
            },
          },
        },
        notCompletedTaskCount: {
          $sum: {
            $cond: {
              if: {
                $eq: ['$completedAt', null],
              },
              then: 1,
              else: 0,
            },
          },
        },
        totalTaskCount: {
          $sum: 1,
        },
      },
    },
  ]
}
