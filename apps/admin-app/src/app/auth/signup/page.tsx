import React from 'react'
import Signup from '@/app/components/Signup'

export const dynamic = "force-dynamic"

export default function SignUp() {    
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
    console.log(process.env.NEXT_PUBLIC_BASE_URL,"data8")

  return (
    <div>
        <div className='w-96 mt-3 ml-3'>
            <Signup NEXT_PUBLIC_BASE_URL={NEXT_PUBLIC_BASE_URL} />
        </div>
    </div>
  )
}
