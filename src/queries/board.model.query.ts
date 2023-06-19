export class BoardModelQuery {
  fetchTodosInBoardArregrationQuery = () => [
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
      $set: {
        'cards.id': '$cards._id',
      },
    },

    {
      $sort: { 'cards.position': 1 },
    },
    {
      $group: {
        _id: '$_id',
        position: { $first: '$position' },
        name: { $first: '$name' },
        cards: {
          $push: {
            $cond: [{ $ne: ['$cards', {}] }, '$cards', '$$REMOVE'],
          },
        },
      },
    },
    {
      $sort: { position: 1 },
    },

    {
      $project: {
        _id: 1,
        id: '$_id',
        position: 1,
        name: 1,
        cards: {
          content: 1,
          _id: 1,
          id: 1,
          position: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ]
}
