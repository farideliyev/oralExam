import React from "react"
import img from '../assets/img/giphy-112.gif'
import "./Error.css"

function Error(props){
    return (
        <div className="error-container">
            <p>{props.error}</p>
            <img src={img}/>

        </div>
    )
}

export default Error