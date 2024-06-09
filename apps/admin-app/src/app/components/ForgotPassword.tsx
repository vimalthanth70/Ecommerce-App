'use client'
import React from 'react'
import {CustomForm} from '@repo/ui'
import { FieldType } from '@repo/types'
import axios from 'axios'

export default function ForgotPassword({NEXT_PUBLIC_BASE_URL}:{NEXT_PUBLIC_BASE_URL:string}) {
    const fields:FieldType[] = [
        {title:'Email',fieldName:'email',type:'email',placeholder:"Email*"}
    ]
    console.log(process.env.GOOGLE_CLIENT_SECRET,'data11')
    const handleSubmit = async(values:any)=>{
      try{
        console.log(process.env.GOOGLE_CLIENT_ID,NEXT_PUBLIC_BASE_URL,'data12')
        const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}api/v1/admin/auth/forgot-password`,{email:values.email})
        if(response.data){
          alert(response.data.message)
        }
        console.log(response.data)
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className='w-96 ml-3 mt-3'>
        <CustomForm submitHandler={handleSubmit} formTitle='Forgot Password' buttonName='Send Email' fields={fields} initialValues={{email:''}}  />
    </div>
  )
}
