import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import './style.css'

function Index(){
    // const [notas, setNotas] = useState([])
    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:5000/'
    //     ).then(res=>{
    //         console.log(res.data.notas);
    //         setNotas(res.data.notas);
    //     }).catch(err=>console.log(err));
    // }, [])
    const notas = [
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'},
        {title:'Title', author:'John Doe', date:'22/01/2023'}   
    ];

    let key = 0;
    return(
        <div>
            <header>
                <h1>Bienvenido a mi Blog!</h1>
                <p>Este es un espacio dedicado a aprender Raect y Flask con MongoDB, busco repasar conceptos como gestión de sesiones por token, permosos y middlewares en un proyecto desarrollado con microservicios</p>
            </header>
            <div className="conteiner">
                {notas.map(n=>{
                    key+=1
                    return(
                        <Link to={'/'+n.title} className="note" key={key}>
                            <img src={'/'+n.image_url?'image_placeholder.jpg':n.image_url} alt="No image aviable" />
                            <h4>{n.title}</h4>
                            <div className="foot">
                                <p>Por: {n.author}</p>
                                <p>{n.date}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
        
    );
}

export default Index;