import React from "react";

function Button(props){
    return(
        <button onClick={props.handler} className={props.className}>{props.text}</button>
    )
}

export default Button;