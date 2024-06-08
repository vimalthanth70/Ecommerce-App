import { ZodType } from 'zod'
import {Request,Response,NextFunction} from 'express'

export const commonValidationMiddleware = (req:Request,res:Response,schema:ZodType,next:NextFunction)=>{
    const result = schema.safeParse(req.body)
    if(!result.success){
        const errors = result.error.flatten()
        console.log(errors,'data9')
        const errorsObj = {
            errors:errors.fieldErrors,
            message:'Validation error'
        }
        res.locals.errors = errorsObj
        return next(errors)
    }else{
        next()
    }
}

// export const idMiddleware = (id:string,,next:NextFunction)=>{
//     const intId = +id
//     if(isNaN(intId)){
        
//     }
// }