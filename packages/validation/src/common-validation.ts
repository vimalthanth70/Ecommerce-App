import z from 'zod'
export const stringField = z.string().min(2,{message:"Field is required!"}).regex(/^[A-Za-z]+$/)
export const email = z.string().min(2,{message:"Field is required!"}).email({message:"Invalid email"})
export const password= z.string().min(2).max(15).regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
