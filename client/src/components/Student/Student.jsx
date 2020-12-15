import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import '../Teacher/Teacher.css';
import {Formik} from 'formik';
import * as Yup from "yup";
import {useHistory} from "react-router";
import {AuthContext} from "../../auth/authContext";


const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required("Student Id is required"),
});

const Student = () => {
    const {dispatch}=useContext(AuthContext)
    const history = useHistory()
    const [serverError, setServerError]=useState("")

    async function handleFetch(id) {
        let response = await fetch("http://localhost:3000/api/students/login",{
            method: "POST",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json"
            }


        })
        // GET STUDENT ID FROM SERVER AND SEND IT TO REDUCER
        if (response.status === 200) {
            history.push('/student/'+id)
        } else if(response.status===401){
            let responseJson=await response.json()
            let error=responseJson.errors[0].msg
            setServerError(error)

        }
    }

    return (
        <Formik
            initialValues={{id: ""}}
            onSubmit={values => {
                handleFetch(values.id)
              }
            }
            validationSchema={validationSchema}
        >
            {({
                  errors,
                  touched,
                  handleChange,
                  handleSubmit

              }) => (
                <Form onSubmit={handleSubmit}>


                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Student Id</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="student id"
                            name="id"
                            onChange={handleChange}
                            className={errors.id ? "error" : null}

                        />
                        {errors.id && touched.id
                            ? (<div className="error-message">{errors.id}</div>)
                            : null
                        }
                        {serverError && <div className="error-message">{serverError}</div>}
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}


export default Student