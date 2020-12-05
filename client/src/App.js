import React from 'react';
import './App.css';
import { Route} from "react-router-dom";

import Teacher from './components/Teacher/Teacher'
import Student from './components/Student/Student';
import HomePage from './HomePage/HomePage';
import Admin from './components/Admin/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import {withAuthRedirect} from "./hoc/withAuthRedirect";


function App() {

    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [user, setUser] = useState(null)

    // const myCallback = (dataFromChild, user) => {
    //     if (dataFromChild) {
    //         setIsLoggedIn(true)
    //         setUser(user)
    //     }
    // }

    return (
        <div>
            <Route exact path="/" render={() => <HomePage/>}/>
            {/*<Route  path="/teacher" render={() => <Teacher parentData={myCallback}/>}/>*/}

            <Route path="/teacher" render={() => <Teacher/>}/>


            <Route path="/student" render={() => <Student/>}/>

            <Route path={`/admin`} component={withAuthRedirect(Admin)}/>
            {/*<Route path={`/admin`} render={()=><Admin/>}/>*/}




        </div>
    );
}

export default App
