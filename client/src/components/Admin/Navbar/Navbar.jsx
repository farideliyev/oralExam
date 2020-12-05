import React, {useContext} from 'react';
import "../Admin.css";
import {Navbar,Nav, Button} from 'react-bootstrap'
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../../../auth/authContext";


const NavBar = (props) => {
 const {state}=useContext(AuthContext)
const history=useHistory()
    
 async function logout(){

     let response= await fetch('http://localhost:3000/api/teachers/logout', {
         method: "POST"
     })

     if (response.status===200) {
          history.push('/')
     }
 }
    return (
    <div className="nav">
            <Navbar bg="light" expand="lg" sticky="top" fixed='top'>
                <Nav className="mr-auto" className="flex-column">
                <Navbar.Brand href="#home">Name of Teacher :
                    <br/><strong>{state.user}</strong>
                </Navbar.Brand>
                        <NavLink to="/admin/add_session">Add Session</NavLink>
                        <NavLink to="/admin/show_students">Show Students</NavLink>
                        <NavLink to="/admin/execute">Execute an exam</NavLink>
                    <Button variant="danger"  onClick={()=>logout()}>Log Out</Button>
                </Nav>
            </Navbar>
        </div>
    )
}
export default NavBar

