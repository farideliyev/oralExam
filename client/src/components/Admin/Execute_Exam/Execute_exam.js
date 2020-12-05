import React, {useEffect, useState} from 'react';
import {Form, Button, Col,} from 'react-bootstrap';
import isAbsent from "yup/lib/util/isAbsent";


    const ExecuteExam = (props) => {

        const [currentUserData, setCurrentUserData ]= useState({id:null, mark:null})
        const [students, setStudents] = useState([]);
        const [studentInProgress, setStudentInProgress]=useState([]);
        const [isPresent, setIsPresent]=useState(null)



        useEffect(() => {
            fetchData();

        }, [])

        const fetchData = async () => {
            let response = await fetch("http://localhost:3000/api/students/available")
            let responseJson = await response.json();
            setStudents(responseJson)

        }
    // save current user mark and id
    const handleCurrentUser = (mark, id) => {

        setCurrentUserData(state => ({
                    ...state,
                    id: id,
                    mark: mark
                }
            ))
    }
    // send mark of student to DB
    const markHandler = async(e) =>  {
            e.preventDefault()
            if (studentInProgress.length > 0 && currentUserData.mark !== null) {

                let response = await fetch(
                    "http://localhost:3000/api/grades/add",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            grdStudentId: currentUserData.id,
                            grade: currentUserData.mark,
                            grdCrsId: 1,
                            grdExamId: 1,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                debugger;
                if( response.status===200) {
                    setStudentInProgress([null]);
                   await fetchData()
                };

        }
    }

    // set the presence of student
        const presenceHandler=(pres, val)=>{
            if(pres==="PRESENT") {
                setStudentInProgress([val])
                setIsPresent(true);

            }
            else if(pres==="ABSENT"){
                setIsPresent(false)
            }
        }

        // show content for exam details (name teacher, exam call and course name)



    return (
        <>
            <div>
                <div className="execute-title">
                    <p>Exam created by {props.user} FOR COURSE.NAME OF JULY CALL</p>
                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Time</th>
                        <th>Presence</th>
                        <th>Grade</th>
                    </tr>
                    </tbody>

                    <tbody>
                    {students
                    && students.map((val, index, arr) => {
                        delete val.presence
                      return (
                            <tr key={val.id}>
                                {Object.keys(val).map((key, index) => {

                                    return (
                                        <>
                                            <td>{val[key]}</td>
                                            {/* SHOW COUNTER*/}
                                            {/*use filter to get rid of displaying NOT YET*/}

                                        </>
                                    )

                                })}
                                <td>
                                    <select onChange={e=>presenceHandler(e.target.value, val.id)}>
                                        <option selected disabled>Please choose</option>
                                        <option>ABSENT</option>
                                        <option>PRESENT</option>
                                    </select>
                                </td>



                                <input type="number"
                                       name={val.id}
                                       onChange={(e)=>handleCurrentUser(Number(e.target.value), val.id)}

                                       id={Number(val.id)}
                                       onFocus={()=>setStudentInProgress(()=>[val.id])}
                                    // onBlur={()=>setStudentInProgress([])}
                                       disabled={isPresent
                                           ?studentInProgress.some(id=>id!==val.id)
                                           :true
                                       }

                                />




                                <input type="submit"
                                       value="Send"
                                       onClick={(e)=>markHandler(e)}
                                       disabled={studentInProgress.some(id=>id!==val.id) }
                                    // disabled={studentInProgress.some(id=>id!==val.id)}
                                />

                            </tr>)
                    })
                    }
                    </tbody>

                </table>
            </div>
        </>

    )
}


export default ExecuteExam

