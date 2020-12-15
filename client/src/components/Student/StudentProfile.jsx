import React, {useContext, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import {AuthContext} from "../../auth/authContext";
import "./StudentProfile.css"


const StudentProfile = (props) => {
    const {state, dispatch} = useContext(AuthContext)
    let history = useHistory()
    const {fullName, id} = state.student
    let userId = props.match.params.id

    //get student data after mounting page
    useEffect(()=>{
        const fetchDataForStudent= async ()=>{
            let response= await fetch("http://localhost:3000/api/students/admin")
            if(response.status===200){
                let data=await response.json()
                debugger
                await dispatch({type: "STUDENT_LOGIN", payload:data.studentData})
            }
        }
    }, [dispatch])


   // LogOut function
    const logout= async ()=>{
        let response= await fetch("http://localhost:3000/api/students/logout")
        if(response.status===200) history.push('/')
    }

    return (
        <div className="stdProfileContainer">
            <p>Student's full name <strong>{fullName}</strong></p>
            <p>StudentId <strong>{id}</strong></p>
            <button type="submit" onClick={logout}>Log out</button>
        </div>

    )
}

export default StudentProfile

