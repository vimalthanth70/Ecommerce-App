import NextAuth from "next-auth"
import { nextAuthOptions } from "@/app/config/nextAuthConfig"

const handler = NextAuth(nextAuthOptions)

export const GET = handler 
export const POST = handler 