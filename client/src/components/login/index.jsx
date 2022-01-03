import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import './style.css'

import Button from "../generals/button.jsx";
import FormSection from "../generals/input_form.jsx";

function LogIn(){
    const [data, setData] = useState({'date':new Date()})
    function dataHandler(event){
        let new_data = {...data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }
    function validateData(event){
        event.preventDefault();
        if(data.username && data.password){
            console.log('Todo bien', data);
            axios.post('http://127.0.0.1:5000/login', data
            ).then(res=>{
                console.log(res.data);
                if (res.data == 'Loged'){
                    alert('Sesión Iniciada')
                }
            }).catch(
                err=>console.log(err))
            setData({'date':new Date()})
        }
    }

    return (
        <section className="container_login">
            <h1>Login</h1>
            <form>
                <FormSection text='Username' id='username' type='text' handler={dataHandler} value={data.username}/>
                <FormSection text='Password' id='password' type='password' handler={dataHandler} value={data.password}/>
                <p>¿No tienes una cuenta? <Link to={'/signup'}>Regístrate aquí</Link></p>
                <Button text='Log In' handler={validateData} className='form_button'/>
            </form>
        </section>
    );
}

export default LogIn;