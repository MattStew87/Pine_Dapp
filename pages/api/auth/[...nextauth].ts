import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"

// Handles user authentication upon connecting your wallet. 
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          })

          if (result.success) {
            return {
              id: siwe.address,
            }
          }
          console.error("SIWE verification failed", result);
          return null
        } catch (e) {
          console.error("Error in authorize function", e);
          return null
        }
      },
    }),
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  if (isDefaultSigninPage) {
    providers.pop()
  }

  try {
    return await NextAuth(req, res, {
      providers,
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async session({ session, token }: { session: any; token: any }) {
          session.address = token.sub
          session.user.name = token.sub
          session.user.image = "https://www.fillmurray.com/128/128"
          return session
        },
      },
    })
  } catch (e) {
    console.error("Error in NextAuth function", e);
    throw e; // re-throw the error to ensure the request fails
  }
}
