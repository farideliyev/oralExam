import React from 'react';
import { TimePicker } from 'antd';
import moment from "moment";

const StudentInfo = (props) => {
   const {grade, time, presence}=props.info
    return (
        <div>
            {grade && <strong>Your grade is {grade}</strong>}
            {presence==="NO" && <p>You were absent</p>}
            {/* if student have time show it and option to delete appointment*/}
            {time===null && presence==="NOT YET" &&
            <div>
                <p>Please choose exam date</p>
                <div>
                    <TimePicker minuteStep={15} format="h:mm"  size="large"
                                showNow={false}
                    />
                </div>
            </div>
            }
        </div>
    )
}

export default StudentInfo

