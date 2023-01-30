import './style.css'

import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';
import jwtValidator from '../../utils/jwt-validator';

import Button from "../generals/button.jsx";
import FormSection from "../generals/input_form.jsx";

function LogIn(){
    const [data, setData] = useState({'date':new Date()});
    const dispatcher = useDispatch();
    const is_loged = useSelector((store)=>store.loginReducer.is_loged);
    const JWT = useSelector((store)=>store.loginReducer.jwt);

    let valid_jwt = false;
    valid_jwt = jwtValidator(JWT);

    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        console.log('Aply')
        // Checking if user is not loggedIn
        if (is_loged && valid_jwt) {
          navigate("/gestion-de-notas");
        } else {
          navigate("/login");
        }
    }, [navigate, isLoggedIn]);

    // console.log('HolaMundo!!',JWT, is_loged)

    function dataHandler(event){
        let new_data = {...data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }
    function validateData(event){
        event.preventDefault();
        if(data.username && data.password){
            console.log('Todo bien', data);

            // axios.post('http://127.0.0.1:5000/login', data
            // ).then(res=>{
            //     console.log(res.data);
            //     if (res.data == 'Loged'){
            //         alert('Sesión Iniciada')
            //     }
            // }).catch(
            //     err=>console.log(err))
            // setData({'date':new Date()})
        } else {
            console.log('falta data')
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