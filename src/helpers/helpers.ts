import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { NextFunction, Response } from 'express'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'

const ENCRYPTION_KEY = 'SOMERANGE()RAMJK'
const IV_LENGTH = 16

export class JSONResponse {
  statusCode: number
  constructor(statusCode = 200) {
    this.statusCode = statusCode
  }

  error = (res: Response, message: any, data: any) => {
    return res.status(this.statusCode).json({
      status: false,
      message,
      data,
    })
  }
  success = (res: Response, message: any, data: any) => {
    return res.status(this.statusCode).json({
      status: true,
      message,
      data,
    })
  }
}
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
export const isObjectId = (value: string | number) =>
  mongoose.Types.ObjectId.isValid(value)
