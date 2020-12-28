import React from "react";

export const initialState = {
    isAuthenticated: false,
    user: null,
    status: null,
    student: ""
};


export const authReducer=(state, action)=>{

    switch (action.type){
        case "LOGIN":

            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case "STUDENT_LOGIN":

            return {
                ...state,
                student: action.payload
            }

        case "STUDENT_LOGOUT":
            return {
                ...state, student: ""
            }


    }
}


export default authReducer