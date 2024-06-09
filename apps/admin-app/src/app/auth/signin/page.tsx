'use client'
import React from 'react'
import { CustomForm } from '@repo/ui'
import {FieldType} from '@repo/types'
import { Button } from '@repo/ui'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
    const router = useRouter()
    const fields:FieldType[] = [
        {title:'Email',fieldName:'email',type:'email',placeholder:"Email*"},
        {title:'Password',fieldName:'password',type:'password',placeholder:"Password*"},
    ]
    const submitHandler = async(values:{email:string,password:string})=>{
      const result = await signIn('credentials',{
        redirect:false,
        username:values.email,
        password:values.password
      })
      if(result?.status==200 && result.ok){
        router.replace('/')
      }
      console.log(result,'data19')
    }
  return (
    <div>
        <div className='w-96 ml-3 mt-3'>
          <CustomForm submitHandler={submitHandler} formTitle='Log In' buttonName='Login' fields={fields} initialValues={{email:'',password:''}} />
          <Button onClick={()=>signIn('google',{redirect:true,callbackUrl:'/'})} className='w-[300px] py-3 mt-2' variant="secondary">Sign In With Google</Button><br />
          <Button className='mt-2' variant="secondary" onClick={()=>router.push('/auth/signup')}>Signup</Button>
        </div>
    </div>
  )
}
