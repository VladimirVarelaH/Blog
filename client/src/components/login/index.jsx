import './style.css'

import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logIn from "../../redux/actions/logActions";

import axios from 'axios';
import jwtValidator from '../../utils/jwt-validator';

import Button from "../generals/button.jsx";
import FormSection from "../generals/input_form.jsx";

function LogIn(){
    const [data, setData] = useState({'date':new Date()});

    const dispatcher = useDispatch();
    const is_loged = useSelector((store)=>store.loginReducer.is_loged);
    const navigate = useNavigate();

    useEffect(() => {
        if (is_loged || jwtValidator()) {
            dispatcher(logIn({jwt:'sdasd',is_loged:true}));
            navigate("/gestion-de-notas");
        } else {
            dispatcher(logIn({jwt:'',is_loged:false}));
        }
    }, [navigate]);


    function dataHandler(event){
        let new_data = {...data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }
    function validateData(event){
        event.preventDefault();
        if(data.username && data.password){
            axios.post('http://localhost:5000/login', {username:data.username, password: data.password}).then(res=>{
                console.log(res.data.data.jwt);
                localStorage.setItem('__token', res.data.data.jwt);
                dispatcher(logIn({jwt:res.data.data.jwt,is_loged:true}));
                navigate("/gestion-de-notas");
            }).catch(err=>{
                console.log(err);
            })
            
        } else {
            // Alerts on the fitire
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