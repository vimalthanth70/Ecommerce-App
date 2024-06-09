'use client'
import React from 'react'
import { FieldType } from '@repo/types'
import { useRouter,useSearchParams } from 'next/navigation'
import axios from 'axios'
import { CustomForm } from '@repo/ui'

export default function ResetPassword({NEXT_PUBLIC_BASE_URL}:{NEXT_PUBLIC_BASE_URL:string}) {
    console.log(NEXT_PUBLIC_BASE_URL,'backendurl')
    const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams)
  
  // const token = router.query.token
  if((searchParams && searchParams.length<1) || !searchParams){
    router.back()
  }
    const fields:FieldType[] = [
        {title:'Password',fieldName:'password',type:'password',placeholder:"Password*"}
    ]
    const handleSubmit = async(values:any)=>{
      console.log(values)
      const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}api/v1/admin/auth/reset-password?token=${searchParams[1]}`,{password:values.password})
      if(response.data.message){
        router.push('/auth/signin')
      } 
    }
  return (
    <CustomForm submitHandler={handleSubmit} formTitle='Reset Password' buttonName='Reset Password' fields={fields} initialValues={{password:''}}  />
  )
}
