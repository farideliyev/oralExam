import React, {useEffect, useState} from 'react';
import {Button, TimePicker} from 'antd';
import moment from "moment";

const StudentInfo = (props) => {
   const [availableDates, setAvailableDates]=useState([])
   const {grade, time, presence, date={}}=props.info
   const {startDate, endDate}=date

   useEffect(()=>{
       if(availableDates){
           let start= new Date (startDate)
           let end= new Date (endDate)
           let difference= end.getDate() - start.getDate()
           if(difference===1){
               setAvailableDates([startDate, endDate])
           }

       }
   }, [startDate, endDate])

   const getDisabledMinutes = (selectedHour) => {
        if(selectedHour===1){
            return [30,45]
        }
    }

    return (
        <div>
            {grade && <strong>Your grade is {grade}</strong>}
            {presence==="NO" && <p>You were absent</p>}
            {/* if student have time show it and option to delete appointment*/}
            {time===null && presence==="NOT YET" &&
            <div>
                <p>Please choose exam date and time</p>
                {availableDates &&
                  availableDates.map((val, index)=>{
                      return (
                          <Button size="small" shape="round">{val}</Button>
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

