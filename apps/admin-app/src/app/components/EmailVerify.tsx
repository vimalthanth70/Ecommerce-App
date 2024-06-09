'use client'
import React from 'react'
import {CustomButton} from '@repo/custom-components'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function EmailVerify({NEXT_PUBLIC_BASE_URL}:{NEXT_PUBLIC_BASE_URL:string}) {
    console.log(NEXT_PUBLIC_BASE_URL,'backendurl')
    const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams)
  
  // const token = router.query.token
  if((searchParams && searchParams.length<1) || !searchParams){
    router.back()
  }
  const handleVerifyEmail = async()=>{
    try{
      const response = await axios.post(`${NEXT_PUBLIC_BASE_URL}api/v1/admin/auth/verify-email?token=${searchParams[1]}`)
      if(response.data.data.email){
        router.push('/signin')
      } 
    }catch(err){
      console.log(err)
    }
    
  } 
  return (
    <CustomButton  className='py-10 rounded-md !w-[30%] !text-[#00203FFF] !bg-[#ADEFD1FF]' variant='secondary' clickHandler={handleVerifyEmail}>Verify Email</CustomButton>
  )
}
