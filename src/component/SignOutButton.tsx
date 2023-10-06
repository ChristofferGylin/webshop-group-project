import { signIn, signOut, useSession } from "next-auth/react"
import { AiOutlineUser } from "react-icons/ai"

const SignOutButton = () => {

    return (
        <button
            className='border bg-slate-100 hover:bg-slate-200 border-slate-300 rounded-lg px-2 py-1'
            onClick={() => signOut()}>
            Sign Out
        </button>
    )
}

export default SignOutButton;