import React,{useEffect, useState} from 'react';
import {Form,Button, Col, } from 'react-bootstrap';
import "./addSession.css"

const AddSession=()=>{
    const [isChecked, setIsChecked]=useState(false);
    const [error, setError]=useState("");
    const [courses, setCourses]=useState("");
    const [students, setStudents]=useState([]);
    const [selectedCourse, setSelectedCourse]=useState(null)
    const [startDate, setStartDate]=useState("")
    const [startTime, setStartTime]=useState("")
    const [slotDuration, setSlotDuration]=useState(0)
    const [sessionDuration, setSessionDuration]=useState(0)
    const [numOfSessions, setNumOfSessions]=useState(0)

    useEffect(()=>{
        getCourses();
        getAvailableStudents();
        if(slotDuration && sessionDuration) calculateNumOfSessions()
    }, [slotDuration, sessionDuration])

    // fetch to get courses
    const getCourses=async ()=>{
        let response= await fetch("http://localhost:3000/api/courses/all")
        let responseJson=await response.json()
        setCourses(responseJson);
    }

        //make fetch to extract available students
    const getAvailableStudents=async ()=>{
        let response= await fetch("http://localhost:3000/api/students/available")
        let responseJson=await response.json()
        setStudents(responseJson);
    }

        //make calculate session work

       const calculateNumOfSessions=()=>{

         let sessionDurationInMinutes=sessionDuration * 60;
         let numbOfStudentsForOneSlot=sessionDurationInMinutes/slotDuration;
         if(numbOfStudentsForOneSlot>=students.length){
             setNumOfSessions(1)
         } else if(numbOfStudentsForOneSlot<students.length) {
             setNumOfSessions(Math.ceil(students.length / numbOfStudentsForOneSlot));
         }
       }

    const fetchToDB = async()=> {
        let sessionStartDateTime=startDate + " " + startTime+":00";
        //month
        let month = new Date(startDate);
        let monthForDB=month.toLocaleString('en-En', { month: 'long' });

        // last date for session
         let lastDateForSession=new Date(startDate);
         lastDateForSession.setDate(lastDateForSession.getDate()+(numOfSessions-1));
         let lastDateForSessionForDB=
           lastDateForSession.getFullYear() + "-" + (lastDateForSession.getMonth() + 1) + "-"+ lastDateForSession.getDate();

         // last Time For Slot
        let lastTimeForSlot=new Date(sessionStartDateTime);
         lastTimeForSlot.setHours(lastTimeForSlot.getHours()+sessionDuration);
        let lasTimeForSlotForDB=lastTimeForSlot.toLocaleTimeString()

        try{
            debugger;
            let response= await fetch("http://localhost:3000/api/exams/add", {
                method: "POST",
                body: JSON.stringify({
                    examCrsName:selectedCourse,
                    examAllSess:numOfSessions,
                    examSessDr:sessionDuration,
                    examMonth:monthForDB,
                    examStartDate:startDate,
                    examStartTime: sessionStartDateTime,
                    examEndDate: lastDateForSessionForDB,
                    examEndTime:lasTimeForSlotForDB,
                    examSlotDuration:"00:"+ slotDuration+":00"
                }),
                headers :{
                    'Content-Type': 'application/json'
                }
            });
            if(response.status===200){
                console.log("PERFECT")
            }
        } catch (err){
           alert(err)
        }

    }

    //send created call to db
       const handleSubmit= async(e)=> {
        e.preventDefault();
        if(isChecked) {
            await setError(null);
            await fetchToDB();
        }else{
            setError("Please confirm");
        }
       }


    return(
        <>
        <Form row sm={4}>
            <h3>Add an exam session for Course
                <select required onChange={e=>setSelectedCourse(e.target.value)} >
                    <option disabled selected>Please select...</option>
                    {courses
                        ?
                        courses.map((val,index)=>{
                           return (
                               <option key={index} name={val.crsName} value={val.crsName}>{val.crsName}</option>
                           )
                        })
                        : <option>Loading</option>
                    }
                </select>
            </h3>
            <Form.Row >
                <Form.Group as={Col} controlId="frmstudentnum">
                    <Form.Label style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>Number of students for this course is  <strong> { students.length}</strong> </Form.Label>
                </Form.Group>
            </Form.Row>
            <Form.Group>
                <Form.Label>List of available students</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                    {students
                        ? students.map((val)=>{
                            return (
                                <option>{`${val.name} ${val.surname} (${val.student_id})`}</option>
                            )
                        })

                        :<option>Loading</option>
                    }
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="sessiondate">
                <Form.Label>Start date of the exam session</Form.Label>
                <Form.Control type="date" onChange={
                    (e)=>setStartDate(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="sessiontime">
                <Form.Label>Start time of the exam session</Form.Label>
                <Form.Control
                    type="time"
                    onChange={
                        (e)=>setStartTime(e.target.value)}
                />
            </Form.Group>

            <Form.Row>
                <Form.Group  controlId="slotDuration">
                    <Form.Label>Duration of the slot(minutes)</Form.Label>
                    <Form.Control type="number" min="1" max="60" placeholder="10" onChange={e=>{setSlotDuration(Number(e.target.value))}} />
                </Form.Group>

                <Form.Group  controlId="sessionDuration">
                    <Form.Label>Duration of the session(hours)</Form.Label>
                    <Form.Control type="number" min="1" max="60" placeholder="10"  onChange={e=>{setSessionDuration(Number(e.target.value))}} />
                </Form.Group>

                <Form.Group controlId="studNumForSession">
                    <Form.Label>Number of students for this exam session</Form.Label>
                    <Form.Control  id="studNumForSession" min="1"  placeholder="10" value={students.length} />
                </Form.Group>

                <Form.Group  controlId="allNumOfSessions">
                    <Form.Label>Number of needed sessions</Form.Label>
                      <Form.Control type="allNumOfSessions"  id="allNumOfSessions" value={numOfSessions}/>
                </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
                <Form.Check checked={isChecked} type="checkbox"
                            label="I have checked all credentials and accepting the creation of the exam"
                            onChange={()=>{setIsChecked(!isChecked);}
                            }/>

            </Form.Group>
            {error
                ? <span className="error" >{error}</span>
                :null

            }
            <Button variant="primary" type="submit" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} onClick={(e)=>handleSubmit(e)}>
                Add the new session
            </Button>
        </Form>
        </>

    )
}


export default AddSession

