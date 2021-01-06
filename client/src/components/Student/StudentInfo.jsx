import React, {useEffect, useState} from 'react';
import {Button, TimePicker} from 'antd';
import moment from "moment";
import './StudentInfo.css'

const StudentInfo = (props) => {
   const [availableDates, setAvailableDates]=useState([])
   const {grade, time, presence, date={}}=props.info
   let {startDate, endDate}=date

   useEffect(()=>{
       if(availableDates){
           let start= new Date (startDate)
           let end= new Date (endDate)
           let difference= end.getDate() - start.getDate()
           if(difference===1){
               setAvailableDates([startDate, endDate])
           } else if(difference===0){
               setAvailableDates([startDate])
           }
       else {
               let necessaryDays=difference-1
               let arrOfDays=[]
                for (let i=0; i<necessaryDays; i++){
                    let d = moment(startDate).add(1, "days").format("YYYY-MM-DD")
                    if(arrOfDays.length!==0) {
                        debugger
                        let d = moment(arrOfDays[arrOfDays.length-1]).add(1, "days").format("YYYY-MM-DD")
                        arrOfDays.push(d)
                    }
                    arrOfDays.push(d)
                }

                setAvailableDates([startDate, ...arrOfDays, endDate])

           }

       }
   }, [startDate, endDate])

   const getDisabledMinutes = (selectedHour) => {
        if(selectedHour===1){
            return [30,45]
        }
    }

    return (
        <div className="studentInfo">
            {grade && <strong>Your grade is {grade}</strong>}
            {presence==="NO" && <p>You were absent</p>}
            {/* if student have time show it and option to delete appointment*/}
            {time===null && presence==="NOT YET" &&
            <div>
                <p>Please choose exam date and time</p>
                {availableDates &&
                  availableDates.map((val)=>{
                      return (
                          <Button size="small" shape="round" className="studentInfo_button" type="primary">
                              {val}
                          </Button>
                      )
                  })
                }
                <div>
                    <TimePicker minuteStep={15} format="h:mm"  size="large"
                                showNow={false}
                                hideDisabledOptions
                                disabledMinutes={getDisabledMinutes}
                    />
                </div>
            </div>
            }
        </div>
    )
}

export default StudentInfo

