import React, {useState} from "react";
import { Link } from "react-router-dom";

import './style.css';

import Button from "../generals/button.jsx";
import FormSection from "../generals/input_form.jsx";

function SignUp(){
    const [data, setData] = useState({'date':new Date()})
    function dataHandler(event){
        let new_data = {...data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }
    function validateData(event){
        event.preventDefault();
        if ((data.password==data.password_validator) && data.password && data.email && data.username){
            console.log('Todo en orden', data);
            setData({'date': new Date()})
        }else{
            console.log('Algo salió mal', data);
            setData({'date': new Date()})
        }
    }
    return (
        <section className="container">
            <h1>SignUp</h1>
            <form>
                <FormSection text='Username' id='username' type='text' handler={dataHandler} value={data.username}/>
                <FormSection text='Email' id='email' type='email' handler={dataHandler} value={data.email}/>
                <FormSection text='Contraseña' id='password' type='password' handler={dataHandler} value={data.password}/>
                <FormSection text='Reingrese la Contraseña' id='password_validator' type='password' handler={dataHandler} value={data.password_validator}/>

                <p>¿Ya tienes una cuenta? <Link to={'/login'}>Inicia sesión aquí</Link></p>
                <Button text='Log In' handler={validateData} className='form_button'/>
            </form>
        </section>
    );
}

export default SignUp;