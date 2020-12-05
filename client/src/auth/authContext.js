import React, {useReducer} from "react";
import authReducer, { initialState} from "./authReducer";

 export const AuthContext = React.createContext();

export function AuthContextProvider({children}){
    const [state, dispatch]=useReducer(authReducer, initialState)

    return(
        <AuthContext.Provider value={{state, dispatch}}>

            {children}
        </AuthContext.Provider>
    )
}

