const httpStatusCodes: IHttpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
}

export interface IHttpStatusCodes {
  OK: number
  BAD_REQUEST: 400
  NOT_FOUND: 404
  INTERNAL_SERVER: 500
}

export { httpStatusCodes }
