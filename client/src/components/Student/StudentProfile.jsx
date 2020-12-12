import React from 'react';
import { useHistory} from 'react-router-dom';


const StudentProfile = (props) => {
    let history=useHistory()
     let userId=props.match.params.id
    const logout= async ()=>{
        let response= await fetch("http://localhost:3000/api/students/logout")
        if(response.status===200) history.push('/')
    }
    return (
        <div >
            {userId}
            <button type="submit" onClick={logout}>Log out</button>
        </div>

    )
}

export default StudentProfile

