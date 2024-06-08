'use client'
import React from 'react'
import { CustomForm } from '@repo/ui'
import { FieldType } from '@repo/types'
import { Button } from '@repo/ui'
import { signIn } from 'next-auth/react'
import {CustomButton} from "@repo/custom-components"
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const fields:FieldType[] = [
        {
            fieldName:"firstName",
            placeholder:"First Name*",
            title:"First Name",
            type:"text"
        },
        {
            fieldName:"lastName",
            placeholder:"Last Name*",
            title:"Last Name",
            type:"text"
        },
        {
            fieldName:"email",
            placeholder:"Email*",
            title:"Email",
            type:"email"
        },
        {
            fieldName:"password",
            placeholder:"Password*",
            title:"Password",
            type:"password"
        },
    ]
    const initialValues={
        firstName:'',
        lastName:'',
        email:'',
        password:""
    }
    const router = useRouter()
    const submitHandler = async(values:any)=>{
        try{
            const response = await axios.post(`http://app-server.devxvimal.online/api/v1/admin/auth/signup`,{...values})
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <div className='w-96 mt-3 ml-3'>
            <CustomForm submitHandler={submitHandler} formTitle='Sign Up' buttonName='Sign Up' fields={fields} initialValues={initialValues} />
            <Button onClick={()=>signIn('google',{redirect:true,callbackUrl:"http://app-admin.devxvimal.online"})} className='w-[300px] py-3 mt-2' variant="secondary">Sign In With Google</Button><br />
            <Button  className='mt-2' variant="secondary" onClick={()=>router.push('/auth/signin')}>singin</Button>

        </div>
    </div>
  )
}
