import React, {useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap'
import './Teacher.css';
import { Formik } from 'formik';
import * as Yup from "yup";
import { useHistory, Route} from 'react-router-dom';
// import Admin from '../Admin/Admin';



const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required("Email is required"),
    password: Yup.string()
     .required("Password is required")
  });

const Teacher=(props)=>{
    const history = useHistory();
    const[isAuth, setIsAuth]=useState(false);

    useEffect(() => {
        if(isAuth){
           props.parentData(isAuth)
        }
    })
    // const[email, setEmail]=useState("");
    // const[password, setPassword]=useState("");

   const handleFetch = async (values) => {
       
    let response = await fetch('http://localhost:3000/api/teachers/login', {
        method: 'POST',
        body: JSON.stringify({
            email: values.email,
            password: values.password
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    })

    if (response.status=== 200) {
         setIsAuth(true)
         console.log(isAuth +" from fetch")
        // console.log(response)
        history.push('/admin')
        
    } else if(response.status===500){
        history.push('/teacher')
    }
}
    return (
        <Formik
        initialValues={{email:"", password:""}} 
        onSubmit={values=>{
            // setEmail(values.email)
            // setPassword(values.password)
            handleFetch(values)
        }}  
        validationSchema={validationSchema}
        > 
        {({errors,
            touched,
            handleChange,
            handleSubmit
           }) => (

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"  
                    name="email"
                    onChange={handleChange}  
                    />
                    {errors.email && touched.email
                     ? (<div className="error-message">{errors.email}</div>)
                     : null
                     }
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={handleChange}
                    />
                     {errors.password && touched.password
                     ? (<div className="error-message">{errors.password}</div>)
                     : null
                     }
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
              </Button>
            </Form>
             )}
        </Formik>
    )
}


export default Teacher