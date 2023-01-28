import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import logo from '../../logo.svg'

function LogedNav(props){
    console.log(props);
    return(
        <nav>
            <img src={logo} alt="logo" />
            <div>
                <p>Hola {}</p>
                <Link to='/gestion-de-notas'>
                    ABM
                </Link>
                <Link to='/logout'>
                    Log Out
                </Link>
            </div>
        </nav>
    );
}

export default LogedNav;