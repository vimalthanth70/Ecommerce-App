import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import {PrismaClient} from "@prisma/client"

const client = new PrismaClient()


export const nextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const baseUrl = process.env.NETX_APP_BASE_URL || ''
              console.log(credentials,'data28')
              try{
                const res = await axios.post(`http://localhost:3001/api/v1/admin/auth/signin`,{
                  email:credentials?.username,
                  password:credentials?.password
                })
                console.log(res.data.data,'data33')
                return {
                  id:res.data.data.id,
                  email:res.data.data.email,
                  name:res.data.data.firstName + " " + res.data.data.lastName
                }

              }catch(err:any){
                console.log(err.response)
                return null
              }
            }
          }),

          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
        
          
        
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
          async signIn({user, account, profile}:any){
            if(account.provider=='google'){
              const response = await client.admin.findFirst({
                where:{
                  email:user.email
                }
              })
              if(!response){
                try{
                  const createdUser = await client.admin.create({
                    data:{
                      firstName:user.name.split(" ")[0],
                      lastName:user.name.split(" ")[1],
                      email:user.email,
                      isVerified:true,
                    }
                  })
                  user.id = createdUser.id
                  return {
                    id:createdUser.id
                  }
                  
                }catch(err){
                  console.log(err)
                  return null
                }
              }
              user.id = response.id
              return {
                id:response.id
              }
            }
            return user
          },
          jwt: async ({ user, token }: any) => {
            console.log(user,'data87')
          if (user) {
              token.uid = user.id;
          }
          return token;
          },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.id = token.uid
            }
            return session
        }
      },
      pages:{
        signIn:"/signin"
      }
      
}