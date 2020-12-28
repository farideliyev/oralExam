import React, {useContext, useState} from 'react';
import "./StudentProfile.css"
import {useHistory} from "react-router";
import {Button} from "antd";
import 'antd/dist/antd.css'
import StudentInfo from "./StudentInfo";
import {AuthContext} from "../../auth/authContext";

const StudentProfile = (props) => {
    const {dispatch}=useContext(AuthContext)
    const history = useHistory()
    const [info, setInfo]=useState({})


    // get information about student
    const getInfo = () => {

       setInfo(props.info)
    }

   // LogOut function
    const logout= async ()=>{
        let response= await fetch("http://localhost:3000/api/students/logout")
       
        if(response.status===200) {
            dispatch({type:"STUDENT_LOGOUT"})
            history.push('/')
        }
    }


    return (
        <div>
            <div className="logout">
                <Button type="primary" size="large" danger onClick={logout} >Log out</Button>
            </div>

            <div className="stdProfileWrapper">

                <p>Student's full name: <strong>{props.fullName}</strong></p>
                <p>Student ID: <strong>{props.id}</strong></p>
                <Button type="primary" size={"large"} onClick={getInfo} className="info">Show Info</Button>
                {info
                    ? <StudentInfo info={info}/>
                    : <p>Loading</p>
                }
            </div>
        </div>
    )
}

export default StudentProfile

