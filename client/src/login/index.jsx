import React, {useState} from "react";
import { Link } from "react-router-dom";

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
            setData({'date':new Date()})
        }
    }

    return (
        <section>
            <h1>Login</h1>
            <form>
                <FormSection text='Username' id='username' type='text' handler={dataHandler} value={data.username}/>
                <FormSection text='Password' id='password' type='password' handler={dataHandler} value={data.password}/>
                <p>¿No tienes una cuenta? <Link to={'/signup'}>Regístrate aquí</Link></p>
                <Button text='Log In' handler={validateData}/>
            </form>
        </section>
    );
}

export default LogIn;