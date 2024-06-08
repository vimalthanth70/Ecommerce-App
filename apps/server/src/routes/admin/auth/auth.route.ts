import {Router,Request,Response} from 'express'
import { 
    loginMiddleware,
    signupMiddleware,
    resetPasswordMiddleware,
    forgotPasswordMiddleware,
    verifyEmailMiddleware
} from '../../../middlewares/admin/auth/auth.middleware'
import { 
    signupController,
    signinController,
    forgotPasswordController,
    verifyEmaiController,
    resetPasswordController 
} from '../../../controllers/admin/auth/auth.controllers'

const authRoute = Router()

authRoute.post('/signin',loginMiddleware,signinController)

authRoute.post("/signup",signupMiddleware,signupController)

authRoute.post('/forgot-password',forgotPasswordMiddleware,forgotPasswordController)

authRoute.post('/reset-password',resetPasswordMiddleware,resetPasswordController)

authRoute.post('/verify-email',verifyEmaiController)

export {authRoute}
