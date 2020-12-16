import React, {useContext, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import {AuthContext} from "../../auth/authContext";
import StudentProfile from "./StudentProfile";


const StudentContainer = (props) => {

    const {state, dispatch} = useContext(AuthContext)
    let history = useHistory()
    const {fullName, id} = state.student
    let userId = props.match.params.id

    // compare data in useReducer with url string
    if(id) {
        if(userId!==id) history.push('/student')
    }

    //get student data after mounting page

    useEffect(() => {
        const fetchDataForStudent = async () => {
            let response = await fetch("http://localhost:3000/api/students/admin")
            if (response.status === 200) {
                let data = await response.json()
                await dispatch({type: "STUDENT_LOGIN", payload: data.studentData})

            }

        }

        fetchDataForStudent()

    }, [])


    return (
        <div>
            <StudentProfile fullName={fullName} id={id}  />
        </div>

    )
}

export default StudentContainer

