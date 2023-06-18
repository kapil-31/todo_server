import moment from 'moment'

export default class AnalayticsQuery {
  getAnalytiscc = () => [
    {
      $lookup: {
        from: 'todos',
        foreignField: 'board',
        localField: '_id',
        as: 'cards',
      },
    },
    {
      $unwind: { path: '$cards', preserveNullAndEmptyArrays: true },
    },
    {
      $match: {
        'cards.completedAt': {
          $gt: new Date(moment().startOf('day').toDate()),
          $lt: new Date(),
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        cards: {
          $push: '$cards',
        },
      },
    },
    // {
    //   $project: {
    //     name: 1,
    //     count: {
    //       $size: '$cards',
    //     },
    //   },
    // },
  ]
}
