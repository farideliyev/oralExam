import React from 'react';
import './App.css';
import { Route, withRouter} from "react-router-dom";
import Teacher from './components/Teacher/Teacher'
import Student from './components/Student/Student';
import HomePage from './HomePage/HomePage';
import Admin from './components/Admin/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withAuthRedirect} from "./hoc/withAuthRedirect";
import StudentProfile from "./components/Student/StudentProfile";


function App() {

   const AdminWithHOC=withAuthRedirect(Admin)
    const StudentProfileWithRouter=withRouter(StudentProfile)


    return (
        <div>
            <Route exact path="/" render={()=><HomePage/>}/>

            <Route path="/teacher" render={() => <Teacher/>}/>

            <Route exact path="/student" render={() => <Student/>}/>
            
            <Route path="/student/:id" render={()=><StudentProfileWithRouter/>}/>


            <Route path={`/admin`} render={()=><AdminWithHOC/>}/>

        </div>
    );
}

export default App
