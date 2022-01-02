import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import './style.css'

function Index(){
    const [notas, setNotas] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/'
        ).then(res=>{
            console.log(res.data.notas);
            setNotas(res.data.notas);
        }).catch(err=>console.log(err));
    }, [])
    let key = 0;
    return(
        <div className="conteiner">
            <h1>Index</h1>
            {notas.map(n=>{
                key+=1
                return(
                    <Link to={'/'+n.title} className="note" key={key}>
                    <h4>{n.title}</h4>
                        <div className="foot">
                            <p>Por: {n.author}</p>
                            <p>{n.date}</p>
                        </div>
                    </Link>
                )})}
        </div>
        
    );
}

export default Index;