'use client'
import React from 'react'
import {Button} from "./button"
import {Input} from './input'
import {FieldType} from '@repo/types'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {signInSchema,signupSchema,resetPasswordSchema,forgotPasswordSchema} from "@repo/validation"



type FormTitle = "Sign Up" | "Log In" | "Forgot Password" | "Reset Password"

type PropsTypes = {
    fields:FieldType[],
    initialValues:any,
    formTitle:FormTitle;
    buttonName:string;
    submitHandler:(values:any)=>void
}

export function CustomForm({fields,initialValues,formTitle,buttonName,submitHandler}:PropsTypes) {
    // console.log(fields,initialValues)
    const getSchema = (formTitle:FormTitle)=>{
        switch (formTitle) {
            case "Sign Up":
                return signupSchema
            case "Log In":
                return signInSchema
            case "Forgot Password":
                return forgotPasswordSchema
            case "Reset Password":
                return resetPasswordSchema
        
            default:
                return forgotPasswordSchema
        }
    }
    const schema = getSchema(formTitle)
    const formik = useFormik({
        initialValues:initialValues,
        onSubmit:(values)=>{
            submitHandler(values)
            console.log(values)
        },
        //@ts-ignore
        validationSchema:toFormikValidationSchema(schema)
    })
  return (
    <form id='jnfjwe' name='this is form' onSubmit={formik.handleSubmit}>
        <h4 className='text-3xl text-white'>{formTitle}</h4>
        {fields.map(({placeholder,title,fieldName,type}:FieldType,index:number)=>{
            const isError = formik.errors[fieldName] && formik.touched[fieldName]
            return <div key={index} className='my-2'>
                    <Input 
                        className={` !border-[1px] !border-white text-white focus-visible:ring-0 ${isError?"border-2 !border-red-500 !placeholder-red-500 !text-red-500":""}`}
                        onChange={formik.handleChange}
                        value={formik.values[fieldName]} 
                        placeholder={placeholder}
                         name={fieldName} type={type} 
                    />
                    {/* <div className='w-[20px] h-[20px] border-2 border-red-500'>

                    </div> */}
                </div>
        })}
        <Button variant="default" type='submit'>{buttonName}</Button>
    </form>
  )
}
