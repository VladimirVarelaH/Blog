import React from "react";
import './style.css'

function FormSection(props){
    let value = ''
    if(props.value){
        value = props.value
    }else{
        value=''
    }
    return(
        <div key={props.id} className={"form-group "+props.aditional_class?props.aditional_class:''}>
            <label htmlFor={props.id}>{props.text}</label>
            <input className={"form-control "} type={props.type} name={props.id} id={props.id} onChange={props.handler} value={value}/>
        </div>
    )
}

export default FormSection;