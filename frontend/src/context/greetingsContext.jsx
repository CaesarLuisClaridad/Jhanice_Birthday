import React from 'react'
import { createContext, useReducer} from 'react'

export const greetingsContext = createContext();

export const greetingsReducer = (state, action) => {
    switch(action.type){
        case "SET_ITEM":
            return{
                items: action.payload,
            }
        
        case "CREATE_ITEM":
            if(!Array.isArray(state.items)){
                return {items: [action.payload, ...state.items]}
            }
            return { items: [action.payload, ...state.items] };
        default:
            return state;
    }
}


export const GreetingsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(greetingsReducer, {
        items: []
    })

    return(
        <>
            <greetingsContext.Provider value={{...state, dispatch}}>
                {children}
            </greetingsContext.Provider>
        </>
    )
}