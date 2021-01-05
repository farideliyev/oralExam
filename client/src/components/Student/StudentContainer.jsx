import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import {AuthContext} from "../../auth/authContext";
import StudentProfile from "./StudentProfile";


const StudentContainer = (props) => {
    const {state, dispatch} = useContext(AuthContext)
    const [date, setDate]=useState("")
    let history = useHistory()
    const {fullName, id, time, grade, presence} = state.student
    const info = {time, grade, presence, date}
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

    // fetch dates if student have not participated yet
    useEffect(() => {
        if (time === null && presence === "NOT YET") {
            const fetchAvailableDates = async () => {
                let response = await fetch("http://localhost:3000/api/students/availableDates")
                let responseJson = await response.json()
                if (date === "") {
                    setDate(responseJson)
                }
            }
            fetchAvailableDates()
        }
    }, [time])




    return (
        <div>
            <StudentProfile fullName={fullName} id={id} info={info} />
        </div>

    )
}

export default StudentContainer

