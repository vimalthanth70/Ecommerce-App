import {z,TypeOf} from 'zod'
import { email,stringField,password } from './common-validation'

export const signInSchema = z.object({
    email,
    password:password
})

export const signupSchema = z.object({
    firstName: stringField, lastName: stringField, email: email, password: password 
})

export const forgotPasswordSchema = z.object({
    email:email
})
export const resetPasswordSchema = z.object({
    password:password
})



export const verifyEmailSchema = z.object({
    email
})