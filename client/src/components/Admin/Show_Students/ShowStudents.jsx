import React, {useEffect, useState} from 'react';
import '../Admin.css'


const ShowStudents = () => {

    const [students, setStudents]=useState([]);
    

    useEffect(() => {
        fetchData();

    },[])

    const fetchData = async () => {
        let response = await fetch("http://localhost:3000/api/students/all")
        let responseJson = await response.json();
        setStudents(responseJson);
        console.log(students)

    }

    function counter(max){
        let num=[];
        for(let i=1; i<=max;i++) {
            num.push(i)
        }
        return <td>{num.f}</td>

    }


    return (
        <div className="wrapper">
            <table >
                <tbody>
                  <tr>

                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Mark</th>
                    <th>Presence</th>
                    <th>Time</th>
                </tr>
                </tbody>
                
                <tbody>
                    {students 
                   && students.map((val,index, arr) => {

                        return (

                            <tr key={val.id}>


                               {Object.keys(val).map((key,index)=>{
                                   return(

                                           <td key={key}>{val[key]}</td>
                                   )
                               })}

                            </tr>)
                    })
                    }
                </tbody>
                
            </table>
        </div>

    )
}

export default ShowStudents

