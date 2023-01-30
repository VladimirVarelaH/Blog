import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import jwtValidator from '../../utils/jwt-validator';
import logIn from "../../redux/actions/logActions";


function ProtectedMiddleware(){
    const dispatcher = useDispatch();
    const is_loged = useSelector((store)=>store.loginReducer.is_loged);
    const JWT = useSelector((store)=>store.loginReducer.jwt);

    console.log('Midd', JWT, is_loged)
    let valid_jwt = false;
    valid_jwt = jwtValidator(JWT);

    const navigate = useNavigate();

    useEffect(() => {
        // Checking if user is not loggedIn
        if (!valid_jwt){
            dispatcher(logIn({jwt:'',is_loged:false}));
            navigate("/login");
        }

    }, [navigate]);




    return (
        <>
        </>
    );
}

export default ProtectedMiddleware;