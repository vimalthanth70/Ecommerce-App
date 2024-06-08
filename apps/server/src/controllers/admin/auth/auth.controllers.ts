import {Request,Response,NextFunction} from 'express'
import {PrismaClient} from '@prisma/client'
import {pbkdf2Sync} from 'crypto'
import fs from "fs"
import path from 'path'
import {sendMailFromGmail} from '../../../common/sendMail'
import jwt,{JwtPayload} from 'jsonwebtoken'
import {hashGenerator} from '../../../common/hashGenerator'
const client = new PrismaClient()

export const signupController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstName,lastName,email,password}=req.body
        const hash = hashGenerator(password)
        const response = await client.admin.create({
            data:{
                firstName,
                lastName,
                email,
                password:hash
            }
        })
        const htmlPath = path.join(__dirname, '../../../../tamplates', 'verifyEmail.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        console.log(htmlContent)
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        const token = jwt.sign({email:response.email},process.env.JWT_SECRET || "",{expiresIn:"300s"})

        htmlContent = htmlContent.replace("{{userName}}",`${response.firstName} ${response.lastName}`)
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        htmlContent = htmlContent.replace("{{replaceLink}}",`${process.env.ADMIN_CLIENT_URL}/auth/verify-email?token=${token}`)


        const respopnse = await sendMailFromGmail(response.email,"Email Verification",htmlContent)
        console.log(respopnse)
        res.status(201).json({
            message:"Verification email sent to your email!",
        })
    }catch(err:any){
        if(err.code=='P2002'){
            res.status(400).json({
                error:"Email already in use!"
            })
            return
        }
        next(err)
    }
}

export const signinController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} =  req.body
        const user = await client.admin.findFirst({
            where:{
                email:email
            }
        })
        if(!user){
            res.locals.error = "User not found!"
            next({statusCode:400,error:"User not found!"})
            return
        }
        const hash = hashGenerator(password)
        if(hash!==user.password){
            res.locals.error = "Password did not match!"
            next({statusCode:400,error:"Password did not match!"})
            return
        }
        const newUSer = {
            email:user.email,
            id:user.id,
            firstName:user.firstName,
            lastName:user.lastName
        }
        if(!user.isVerified){
            const htmlPath = path.join(__dirname, '../../../../tamplates', 'verifyEmail.html');
            let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
            console.log(htmlContent)

            htmlContent = htmlContent.replace("{{userName}}",`${user.firstName} ${user.lastName}`)
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const token = jwt.sign({email:user.email},process.env.JWT_SECRET || "",{expiresIn:"300s"})
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            htmlContent = htmlContent.replace("{{replaceLink}}",`${process.env.ADMIN_CLIENT_URL}/auth/verify-email?token=${token}`)
    
            const respopnse = await sendMailFromGmail(user.email,"Reset Password",htmlContent)
            console.log(respopnse)
            const error = {
                error:"Your account is not verified, we have sent verification link in you email.",
                statusCode:400
            }
            res.locals.error = error
            next(error)
            return
        }
        res.status(200).json({
            message:"Loggedin successfully!",
            data:newUSer
        })
    }catch(err){
        next(err)
    }
}

export const forgotPasswordController = async(req:Request,res:Response,next:NextFunction)=>{
    try{

        const {email} = req.body
        const user = await client.admin.findFirst({
            where:{
                email
            }
        })
        if(!user){
            res.locals.error = "User not found!"
            next({statusCode:404,error:"User not found!"})
            return
        }
        console.log(user)
        const htmlPath = path.join(__dirname, '../../../../tamplates', 'resetPasswordTemplet.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

        
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        const token = jwt.sign({email:user.email},process.env.JWT_SECRET || "",{expiresIn:"300s"})

        htmlContent = htmlContent.replace("{{userName}}",`${user.firstName} ${user.lastName}`)
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        htmlContent = htmlContent.replace("{{replaceLink}}",`${process.env.ADMIN_CLIENT_URL}/auth/reset-password?token=${token}`)
        console.log(htmlContent)

        const respopnse = await sendMailFromGmail(user.email,"Reset Password",htmlContent)
        console.log(respopnse)

        res.status(200).json({
            message:"Reset password link sent to your registered email!"
        })
        
        
    }catch(err){
        console.log(err)
        next(err)
    }
}

export const verifyEmaiController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.query.token){
            const error = {
                statusCode:400,
                error:"token is required"
            } 
            res.locals.error = error
            next(error)
            return
        }
        const {token} = req.query
        console.log(token)
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const response:any = jwt.verify(token.toString(),process.env.JWT_SECRET || '')
            console.log(response)
            const varifiedUser = await client.admin.update({
                where:{
                    email:response.email
                },
                data:{
                    isVerified:true
                }
            })
            res.status(200).json({
                data:{
                    email:varifiedUser.email
                },
                message:"User verified!"
            })
    }catch(err){
        const error = {
            error:'Invalid token',
            statusCode:400
        }
        res.locals.error = error
        next(error)
    }
}

export const resetPasswordController = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        if(!req.query.token){
            const error = {
                statusCode:400,
                error:"token is required"
            } 
            res.locals.error = error
            next(error)
            return
        }
        const {token} = req.query
        const {password} = req.body
        const hash = hashGenerator(password)
        console.log(token)
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const response:any = jwt.verify(token.toString(),process.env.JWT_SECRET || '')
            console.log(response)
            const newUser = await client.admin.update({
                where:{
                    email:response.email
                },
                data:{
                    password:hash
                }
            })
            res.status(200).json({
                message:"password updtaed successfully!"
            })
    }catch(err){
        const error = {
            error:'Invalid token',
            statusCode:400
        }
        res.locals.error = error
        next(error)
    }
}