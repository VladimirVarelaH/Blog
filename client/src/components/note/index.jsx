import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';

import './style.css'

function Note(){
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/nota/'+params.note
        ).then(res=>{
            setData({... res.data.nota});
        }).catch(err=>console.log(err));
    }, [])
    return(
        <div>
            <div className="title">
                <h1>{data.title}</h1>
                <p>Por: {data.author}</p>
            </div>
            <hr />
            <p className="paragraph">{data.body}</p>
        </div>
    );
}

export default Note;
