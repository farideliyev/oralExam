import React from 'react';
import "../Admin.css";
import {Navbar,Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
    <div className="nav">
            <Navbar bg="light" expand="lg" sticky="top" fixed='top'>
                <Nav className="mr-auto" className="flex-column">
                <Navbar.Brand href="#home">Name of Teacher</Navbar.Brand>
                        <NavLink to="/admin/add_session">Add Session</NavLink>
                        <NavLink to="/admin/show_students">Show Students</NavLink>
                        <NavLink to="/admin/execute">Execute an exam</NavLink>
                </Nav>
            </Navbar>
        </div>
    )
}
export default NavBar

