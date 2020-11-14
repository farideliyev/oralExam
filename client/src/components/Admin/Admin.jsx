import React from 'react';
import "./Admin.css";
import AddSession from './Add_Session/addSession'
import ShowStudents from './Show_Students/ShowStudents';
import ExecuteExam from './Execute_Exam/Execute_exam';
import Navbar from './Navbar/Navbar'
import {BrowserRouter, Route } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';


const Admin = () => {

    return (
        <div >
            <BrowserRouter>
                <Row>
                    <Col md={2}>
                        <Navbar />
                    </Col>
                        <Col md={10}>
                         <Route path="/admin/add_session" render={() => <AddSession />} />            
                         <Route path="/admin/show_students" render={() => <ShowStudents />} />
                         <Route path="/admin/execute" render={() => <ExecuteExam />} />
                    </Col>
                </Row>

            </BrowserRouter>
        </div>

    )
}
export default Admin

