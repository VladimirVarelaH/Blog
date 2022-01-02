import React from "react";

function FormSection(props){
    let value = ''
    if(props.value){
        value = props.value
    }else{
        value=''
    }
    return(
        <div key={props.id}>
            <label htmlFor={props.id}>{props.text}</label>
            <input type={props.type} name={props.id} id={props.id} onChange={props.handler} value={value}/>
        </div>
    )
}

export default FormSection;