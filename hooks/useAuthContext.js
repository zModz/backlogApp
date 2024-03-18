import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const useAuthContext = () => {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        throw Error("useAuthContext must be used inside an AuthCTXProvider")
    }

    return ctx
}