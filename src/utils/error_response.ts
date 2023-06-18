import { NextFunction, Request, Response } from 'express'
import ErrorResponse from './error_handler'
import { isCelebrateError } from 'celebrate'

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, 'err')

  let error = { ...err }
  error.message = err.message

  // moongoose error
  //@ts-ignore
  if (err?.code === 1100) {
    const message = 'Field already exists or duplicate value encountered'
    error = new ErrorResponse(message, 400)
  }
  // mongoose validation error
  if (err.name == 'CastError') {
    const message = 'Invalid parameter passed'
    error = new ErrorResponse(message, 400)
  }
  // mongoose validation error
  if (err.name == 'ValidationError') {
    //@ts-ignore
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }
  res.status(error.status || 500).json({
    status: false,
    message: error.message || 'Server error !',
  })
}

export default errorHandler
