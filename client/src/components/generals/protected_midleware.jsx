import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import jwtValidator from '../../utils/jwt-validator';
import logIn from "../../redux/actions/logActions";


function ProtectedMiddleware(){
    const dispatcher = useDispatch();

    let valid_jwt = jwtValidator();
    const navigate = useNavigate();

    useEffect(() => {
        // Checking if user is not loggedIn
        if (!valid_jwt){
            dispatcher(logIn({is_loged:false}));
            navigate("/login");
        } else {
            dispatcher(logIn({is_loged:true}));
        }

    }, [navigate]);




    return (
        <>
        </>
    );
}

export default ProtectedMiddleware;