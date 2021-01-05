import React from "react"
import loader from '../assets/img/preloader/805.gif'

const Preloader = () => {
    return (
        <div style={
            {
                display:"flex", justifyContent:"center",
                height:"100vh", alignItems:"center"
            }
        }>
            <img src={loader} style={{width: "100px"}}/>
        </div>
    )
}

export default Preloader