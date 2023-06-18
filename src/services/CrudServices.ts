export default class CrudServices {
  model: any
  constructor(model?: any) {
    this.model = model
  }
  get = async (query: any) => await this.model.find(query).sort('position')
  updateOne = async (updatedFields: {
    filterQuery: any
    updateQuery: any
    opts?: object
  }) => {
    try {
      let result = await this.model.updateOne(
        updatedFields.filterQuery,
        updatedFields.updateQuery,
        {
          upsert: true,
          ...updatedFields.opts,
        }
      )
      return result
    } catch (e) {
      throw e
    }
  }
  create = async (payload: any) => {
    try {
      let result = await this.model.create(payload)
      return result
    } catch (e) {
      throw e
    }
  }
  delete = async (id: any) => {
    try {
      let result = await this.model.deleteOne({ _id: id })
      return result
    } catch (e) {
      throw e
    }
  }
  bulWrite = async (bluckUpdate: any) => {
    try {
      return await this.model.bulkWrite(
        bluckUpdate,
        {
          ordered: false,
        },
        { upsert: true }
      )
    } catch (e) {
      throw e
    }
  }
  aggregrate = async (findQuery: any = [{}]) => {
    try {
      return await this.model.aggregate(findQuery as any)
    } catch (e) {
      throw e
    }
  }
}
