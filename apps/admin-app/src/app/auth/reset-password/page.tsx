import ResetPassword from '@/app/components/ResetPassword'

export const dynamic = "force-dynamic"

export default function RPassword() {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
  console.log(process.env.NEXT_PUBLIC_BASE_URL,"data8")

  return (
      <div className='w-96 ml-3 mt-3'>
        <ResetPassword NEXT_PUBLIC_BASE_URL={NEXT_PUBLIC_BASE_URL} />
      </div>
  )
}
