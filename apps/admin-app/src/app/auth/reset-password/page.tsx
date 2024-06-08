'use client'
import {CustomForm} from '@repo/ui'
import {Suspense} from 'react'
import { FieldType } from '@repo/types'
import { useRouter,useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function ResetPassword() {
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
      const response = await axios.post(`http://localhost:3001/api/v1/admin/auth/reset-password?token=${searchParams[1]}`,{password:values.password})
      if(response.data.message){
        router.push('/auth/signin')
      } 
    }
  return (
    <Suspense>
      <div className='w-96 ml-3 mt-3'>
          <CustomForm submitHandler={handleSubmit} formTitle='Reset Password' buttonName='Reset Password' fields={fields} initialValues={{password:''}}  />
      </div>

    </Suspense>
  )
}
