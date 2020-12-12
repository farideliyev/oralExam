import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/authContext";
import { useHistory} from "react-router";

export const withAuthRedirect = (Component) => {

  return function () {
    const {state} = useContext(AuthContext)
    const [status, setStatus]=useState(null)
    const [serverError, setServerError]=useState("")
    const history=useHistory()

    useEffect(()=>{
      fetchToAdmin()
    }, [])

    async function fetchToAdmin(){

      let response= await fetch("http://localhost:3000/api/admin")

      if(response.status===200){
        let responseJson= await response.json()
        state.user=responseJson
         setStatus(response.status)
      } else if(response.status===401){

        history.push('/')
      }
      else if(response.status===403){
        debugger
        let responseJson= await response.json()
         setStatus(403)
        setServerError(responseJson)
      }
    }

    return (
        <div>
          {status===200 && <Component user={state.user}/>}
          {status===403 && <div>{serverError}</div>}
        </div>
    )

  }
}


