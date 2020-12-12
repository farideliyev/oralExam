import React from "react";

export const initialState = {
    isAuthenticated: false,
    user: null,
    status: null
};

export const authReducer=(state, action)=>{

    switch (action.type){
        case "LOGIN":

            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
    }
}


export default authReducer