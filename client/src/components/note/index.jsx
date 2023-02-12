import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

import './style.css'

function Note(){
    const [data, setData] = useState({body:[]});
    const params = useParams();
    var search = window.location.search.substring(1);
    search = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/nota/'+search.note
        ).then(res=>{
            setData({... res.data.nota});
            // console.log({... res.data.nota})
        }).catch(err=>console.log(err));
    }, [])
    
    return(
        <div>
            <div className="title">
                <h1>{params.note}</h1>
                <p className="date">{data.date}</p>
            </div>
            <hr />
            {data.body.map((el, key)=>{
                return <p className="paragraph" key={key}>{el}</p>
            })}
            <p className="paragraph author">Por: {data.author}</p>
        </div>
    );
}

export default Note;
