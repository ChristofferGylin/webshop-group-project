import { type DefaultSession, type DefaultUser, } from "next-auth"

declare module 'next-auth' {

    interface Session extends DefaultSession {
        user: {

            role: string

        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        role: string
    }


}