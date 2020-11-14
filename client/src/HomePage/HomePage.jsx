import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css'
import { Container, Row, Col } from 'react-bootstrap'

const HomePage = () => {
    return (
        <div className={styles.homePage}>

            <h1>
                Welcome
            </h1>
            <Container>
                <Row>
                    <Col my-auto>
                    <NavLink to='/teacher'>
                      <div className={styles.homePageContainer}>
                        <div className={styles.homePageContainer_text}>
                           <h4  >I am a teacher</h4>
                        </div> 
                      </div>  
                      </NavLink>
                    </Col>

                    <Col>
                    <NavLink to='/student'>
                    <div className={styles.homePageContainer}>
                        <div className={styles.homePageContainer_text}>
                           <h4  >I am a student</h4>
                        </div>  
                    </div>
                    </NavLink>
                    </Col>
                </Row>
            </Container>
            {/* <p>
                I am a techer
            </p>
            <p>
                I am a student
            </p> */}
        </div>
    )
}


export default HomePage