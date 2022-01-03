import React from "react";
import { Link } from "react-router-dom";
import './style.css'
import logo from '../logo.svg'

function NavBar(){
    return(
        <nav>
            <img src={logo} alt="logo" />
            <div>
            <Link to='/'>
                Inicio
            </Link>
            <Link to='/login'>
                Log In
            </Link>
            </div>
        </nav>
    );
}

export default NavBar;