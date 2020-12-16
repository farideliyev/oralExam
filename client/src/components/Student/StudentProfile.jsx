import React from 'react';
import "./StudentProfile.css"
import {useHistory} from "react-router";

const StudentProfile = (props) => {
 const history=useHistory()

   // LogOut function
    const logout= async ()=>{
        let response= await fetch("http://localhost:3000/api/students/logout")
        if(response.status===200) history.push('/')
    }

    return (
        <div className="stdProfileWrapper">
            <p>Student's full name <strong>{props.fullName}</strong></p>
            <p>StudentId <strong>{props.id}</strong></p>
            <button type="submit" onClick={logout}>Log out</button>
        </div>

    )
}

export default StudentProfile

