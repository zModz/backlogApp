import { createContext, useReducer } from "react";

export const BacklogCTX = createContext();

export const BacklogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BACKLOG':
            return {
                backlogs: action.payload
            }
        case 'CREATE_BACKLOG':
            return {
                backlogs: [action.payload, ...state.backlogs]
            }
        case 'ADD_BACKLOG':
            return {
                backlogs: action.payload
            }
        default:
            return state;
    }
}

export const BacklogCTXProvider = ({children}) => {
    const [state, dispatch] = useReducer(BacklogReducer, {
        backlogs: null
    })

    return (
        <BacklogCTX.Provider value={{ ...state, dispatch }}>
            {children}
        </BacklogCTX.Provider>
    )
}