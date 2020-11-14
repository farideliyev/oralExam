import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route } from "react-router-dom";
import Teacher from './components/Teacher/Teacher'
import Student from './components/Student/Student';
import HomePage from './HomePage/HomePage';
import Admin from './components/Admin/Admin';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [isLoggedIn, setIsLoggedIn]=useState(true)

  const myCallback=(dataFromChild)=>{
     
    if(dataFromChild){
      console.log(dataFromChild)
        setIsLoggedIn(true) 
        console.log(isLoggedIn+"from console.log")
        debugger;
      }
  }

  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <HomePage/>}/>
      <Route  path="/teacher" render={() => <Teacher parentData={myCallback}/>}/>
      <Route  path="/student" render={() => <Student/>}/>

       {isLoggedIn&& <Route  path="/admin" render={() => <Admin/>}/>}
    </BrowserRouter>
  );
}

export default App;
