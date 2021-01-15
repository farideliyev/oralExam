import React, {useEffect, useState} from 'react';
import {Button, TimePicker} from 'antd';
import moment from "moment";
import './StudentInfo.css'
import {handleFetch} from "./Student";
import {useHistory} from "react-router";

const StudentInfo = (props) => {
    const history = useHistory()
    const [availableDates, setAvailableDates] = useState([])
    const [selectedDateTime, setSelectedDateTime] = useState({date:"", time:""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const {id, grade, time, presence, date = {}} = props.info
    let {startDate, endDate, startTime, endTime} = date

    useEffect(() => {
        if (availableDates) {
            let start = new Date(startDate)
            let end = new Date(endDate)
            let difference = end.getDate() - start.getDate()
            if (difference === 1) {
                setAvailableDates([startDate, endDate])
            } else if (difference === 0) {
                setAvailableDates([startDate])
            } else {
                let necessaryDays = difference - 1
                let arrOfDays = []
                for (let i = 0; i < necessaryDays; i++) {
                    let d = moment(startDate).add(1, "days").format("YYYY-MM-DD")
                    if (arrOfDays.length !== 0) {

                        let d = moment(arrOfDays[arrOfDays.length - 1]).add(1, "days").format("YYYY-MM-DD")
                        arrOfDays.push(d)
                    }
                    arrOfDays.push(d)
                }

                setAvailableDates([startDate, ...arrOfDays, endDate])

            }

        }
    }, [startDate, endDate])

    const handleCheck = async (e) => {
        e.preventDefault()

        if(selectedDateTime.time && selectedDateTime.date) {
            setError("")
            setLoading(true)
            let response = await fetch("http://localhost:3000/api/students/addDatetime", {
                method: "POST",
                body: JSON.stringify({
                    datetime: selectedDateTime.date + " " + selectedDateTime.time,
                    id:id

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(response.status===409) {

                setError("Slot is full")
                setLoading(false)
                setSelectedDateTime(prevState => ({...prevState, date:"", time:""}))
            }
            else if(response.status===200){
                setLoading(false)
                let response = await handleFetch(id)
                if(response.status===200){
                    history.go(0)
                }

            }
        } else {
          setError("Please choose time")
            setLoading(false)
        }
    }


    // get Date
    const getSelectedDate=(e)=>{
        let inner=e.target.innerText
        setSelectedDateTime(prevState => ({...prevState, date:inner}))
    }

    //get time
    const getSelectedTime=(time, timeString)=>{
        let formattedTime=timeString+ ":00"
         setSelectedDateTime(prevState => ({...prevState, time:formattedTime}))
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledHours() {
        const hours = range(0, 60);
        let sT = startTime.split(":")[0]
        let eT = endTime.split(":")[0]
        let step=(eT-sT)+1
        hours.splice(sT, step);
        return hours;
    }

    return (
        <div className="studentInfo">
            {grade && <strong>Your grade is {grade}</strong>}
            {presence === "NO" && <p>You were absent</p>}
            {time && !grade && <p>Your exam will be held on {time}</p>}
            {time === null && presence === "NOT YET" &&
            <div>
                <p>Please choose exam date and time</p>
                {availableDates &&
                availableDates.map((val) => {

                    return (
                        <Button
                            onClick={getSelectedDate} name={val} size="small"
                            shape="round" className="studentInfo_button" type="primary">
                              {val}
                        </Button>
                    )
                })
                }
                <div>
                    <TimePicker minuteStep={15}  size="large"
                                showNow={false}
                                format="HH:mm"
                                hideDisabledOptions
                                disabledHours={disabledHours}
                                onChange={getSelectedTime}
                    />
                </div>
                <div>
                    <Button size="large" type="primary"
                            className="studentInfo_button-check" loading={loading}
                            onClick={handleCheck}

                    >

                        Add if datetime
                        <span>{`${selectedDateTime.date} ${selectedDateTime.time}`}</span>
                        available
                    </Button>
                </div>
                {error && <div style={{color:"red"}}>{error}</div>}
            </div>
            }
        </div>
    )
}

export default StudentInfo

