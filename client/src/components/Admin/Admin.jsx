import React, {useContext, useEffect} from 'react';
import "./Admin.css";
import AddSession from './Add_Session/addSession'
import ShowStudents from './Show_Students/ShowStudents';
import ExecuteExam from './Execute_Exam/Execute_exam';
import Navbar from './Navbar/Navbar'
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import {AuthContext} from "../../auth/authContext";



const Admin = (props) => {
    const {state}=useContext(AuthContext)

    return (
        <div >
            <BrowserRouter>
                <Row>
                    <Col md={2}>
                        <Navbar  history={props.history}/>
                    </Col>
                        <Col md={10}>
                         <Route path="/admin/add_session" render={() => <AddSession />} />
                         <Route path="/admin/show_students" render={() => <ShowStudents />} />
                         <Route path="/admin/execute" render={() => <ExecuteExam user={props.user} />} />
                    </Col>
                </Row>

            </BrowserRouter>
        </div>

    )
}
export default Admin

