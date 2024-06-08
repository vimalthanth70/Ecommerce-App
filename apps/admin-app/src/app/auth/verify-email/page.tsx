'use client'
import React,{Suspense} from 'react'
import {CustomButton} from '@repo/custom-components'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function VerifyImahel() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams)
  
  // const token = router.query.token
  if((searchParams && searchParams.length<1) || !searchParams){
    router.back()
  }
  const handleVerifyEmail = async()=>{
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/admin/auth/verify-email?token=${searchParams[1]}`)
      if(response.data.data.email){
        router.push('/signin')
      } 
    }catch(err){
      console.log(err)
    }
    
  } 
  return (
    <Suspense>

      <div className='flex h-full w-full justify-center items-center'>
        <div className='w-[50%] h-[30%] border-gray-600 rounded-md border-2 border-[#ADEFD1FF] bg-[#00203FFF] flex justify-center items-center'>
          <CustomButton  className='py-10 rounded-md !w-[30%] !text-[#00203FFF] !bg-[#ADEFD1FF]' variant='secondary' clickHandler={handleVerifyEmail}>Verify Email</CustomButton>
        </div>
      </div>
    </Suspense>
  )
}
