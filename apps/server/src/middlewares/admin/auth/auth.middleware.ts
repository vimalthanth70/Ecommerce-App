import {signInSchema,signupSchema,resetPasswordSchema,forgotPasswordSchema,verifyEmailSchema} from '@repo/validation'
import {Request,Response,NextFunction} from 'express'
import { commonValidationMiddleware } from '../../../common/validation.middleware'
export const loginMiddleware = (req:Request,res:Response,next:NextFunction)=>commonValidationMiddleware(req,res,signInSchema,next)
export const signupMiddleware = (req:Request,res:Response,next:NextFunction)=>commonValidationMiddleware(req,res,signupSchema,next)
export const resetPasswordMiddleware = (req:Request,res:Response,next:NextFunction)=>commonValidationMiddleware(req,res,resetPasswordSchema,next)
export const forgotPasswordMiddleware = (req:Request,res:Response,next:NextFunction)=>commonValidationMiddleware(req,res,forgotPasswordSchema,next)
export const verifyEmailMiddleware = (req:Request,res:Response,next:NextFunction)=>commonValidationMiddleware(req,res,verifyEmailSchema,next)