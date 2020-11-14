import React from "react";
import {
  Redirect, 
  Route
} from "react-router-dom";
import Admin from "../components/Admin/Admin";

const withAuthRedirect = () => {
  debugger;
  return (
    <Route path="/admin" render={()=>Admin}></Route>
  )
 
}

export default withAuthRedirect


