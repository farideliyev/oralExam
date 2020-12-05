import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/authContext";
import {Redirect, useHistory} from "react-router";

export const withAuthRedirect = (Component) => {

  return function () {
    const {state} = useContext(AuthContext)
    const [status, setStatus]=useState(null)
    const history=useHistory()

    useEffect(()=>{
      fetchToAdmin()
    }, [])

    async function fetchToAdmin(){
      debugger
      let response= await fetch("http://localhost:3000/api/admin")
      console.log(response)
      if(response.status==200){
        let responseJson= await response.json()
        state.user=responseJson
         setStatus(response.status)
      } else if(response.status===401){
        debugger
        history.push('/')
      }
    }

    return (
        <div>
          {status===200 && <Component user={state.user}/>}
        </div>
    )

  }
}


