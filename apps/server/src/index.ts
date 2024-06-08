import express,{Request,Response,NextFunction} from 'express'
import { authRoute } from './routes/admin/auth/auth.route'
import {randomBytes} from 'crypto'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/admin/auth',authRoute)


app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode = err.statusCode || 500
    if(res.locals.errors){
        res.status(400).json({message:res.locals.errors.message,errors:res.locals.errors.errors})
        return
    }
    if(res.locals.error){
        res.status(400).json({error:res.locals.error})
        return

    }
    res.status(err.statusCode).json({message:"Something is up with our server!"})
})

app.listen(3001,()=>{
    console.log('server is running on port 3001')
})