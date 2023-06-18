export default class ErrorResponse extends Error {
  status: number
  constructor(message: any, status: any) {
    super(message)
    this.status = status
  }
}
