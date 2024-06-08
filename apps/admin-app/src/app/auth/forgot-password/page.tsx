'use client'
import {CustomForm} from '@repo/ui'
import { FieldType } from '@repo/types'
import axios from 'axios'

export default function ForgotPassword() {
    const fields:FieldType[] = [
        {title:'Email',fieldName:'email',type:'email',placeholder:"Email*"}
    ]
    const handleSubmit = async(values:any)=>{
      try{
        const response = await axios.post('http://app-server.devxvimal.online/api/v1/admin/auth/forgot-password',{email:values.email})
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
