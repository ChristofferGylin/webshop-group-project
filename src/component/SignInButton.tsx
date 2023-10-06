import { signIn, signOut, useSession } from "next-auth/react"
import { AiOutlineUser } from "react-icons/ai"

const SignInButton = () => {

    return (
        <button
            onClick={() => signIn()}>
            <AiOutlineUser size={30} />
        </button>
    )
}

export default SignInButton;