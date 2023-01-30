import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import logIn from "../../redux/actions/logActions";


function LogOut(){
    const dispatcher = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        // Checking if user is not loggedIn
        localStorage.setItem('__token', '');
        dispatcher(logIn({jwt:'',is_loged:false}));
        navigate("/login");

    }, [navigate]);




    return (
        <>
            <p>Cerrando sesión...</p>
        </>
    );
}

export default LogOut;