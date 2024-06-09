import ForgotPassword from "@/app/components/ForgotPassword"

export const dynamic = "force-dynamic"

export default function FPcomponnet() {
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
    debugger
    console.log(process.env.NEXT_PUBLIC_BASE_URL,"data8")

  return (
    <ForgotPassword NEXT_PUBLIC_BASE_URL={NEXT_PUBLIC_BASE_URL} />
  )
}
