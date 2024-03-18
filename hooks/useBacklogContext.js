import { BacklogCTX } from "../context/backlogContext"
import { useContext } from "react"

export const useBacklogContext = () => {
    const ctx = useContext(BacklogCTX)

    if (!ctx) {
        throw Error("useBacklogCTX must be used inside an BacklogCTXProvider")
    }

    return ctx
}