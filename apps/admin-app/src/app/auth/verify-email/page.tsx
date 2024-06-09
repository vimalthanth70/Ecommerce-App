import React from 'react'
import EmailVerify from '@/app/components/EmailVerify'

export const dynamic = "force-dynamic"

export default function VerifyEmail() {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
  console.log(process.env.NEXT_PUBLIC_BASE_URL,"data8")
  return (

      <div className='flex h-full w-full justify-center items-center'>
        <div className='w-[50%] h-[30%] border-gray-600 rounded-md border-2 border-[#ADEFD1FF] bg-[#00203FFF] flex justify-center items-center'>
          <EmailVerify NEXT_PUBLIC_BASE_URL={NEXT_PUBLIC_BASE_URL}/>
        </div>
      </div>
  )
}
