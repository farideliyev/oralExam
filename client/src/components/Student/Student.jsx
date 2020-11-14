import React from 'react';
import {Form,Button} from 'react-bootstrap'
import '../Teacher/Teacher.css';
import { Formik } from 'formik';
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    id: Yup.string()
    .required("Id is required"),
  });

const Student=(props)=>{

    return (
        <Formik 
        initialValues={{id:""}} 
        onSubmit={values=>{console.log(values)}}  
        validationSchema={validationSchema}
        >
         {({errors,
            touched,
          handleChange,
          handleSubmit
         
           }) => (
            <Form onSubmit={handleSubmit}>
      

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Student Id</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="student id"  
                    name="id"
                    onChange={handleChange}
                    className={errors.id ? "error" : null}

                     />
                     {errors.id && touched.id
                     ? (<div className="error-message">{errors.id}</div>)
                     : null
                     }
                </Form.Group>


                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
          )}
        </Formik>
    )
}


export default Student