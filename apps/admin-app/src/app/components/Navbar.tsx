'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '@repo/ui'
import { signIn,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
    const session = useSession()
  return (
    <div className='mt-4 ml-2'>
        {JSON.stringify(session)}
        {session.status !== 'authenticated' && <Button variant="secondary" className='mr-2 ml-2' onClick={()=>router.push('/auth/signin')}>Login</Button>}
        {session.status !== 'authenticated' && <Button variant="secondary" className='mr-2 ml-2' onClick={()=>router.push('/auth/signup')}>Signup</Button>}
        {session.status == 'authenticated' &&<Button variant="destructive" onClick={()=>signOut()}>Logout</Button>}
    </div>
  )
}
