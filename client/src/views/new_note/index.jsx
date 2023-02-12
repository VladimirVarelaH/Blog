import React, {useState} from "react";
import { useEffect } from "react";
import axios from 'axios';

import ProtectedMiddleware from '../../components/generals/protected_midleware.jsx';
import FormSection from "../../components/generals/input_form.jsx";

import './style.css'

function NewNote(){
    var search = window.location.search.substring(1);
    if (search){
        search = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    } else {
        search = {};
    }

    const [data, setData] = useState({});

    function dataHandler(event){
        let new_data = {...data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }

    useEffect(()=>{
        if (search.note){

            axios.get('http://127.0.0.1:5000/nota/'+search.note).then(res=>{
                let local_data = res.data.nota
                local_data.body = local_data.body.join('\n');
    
                setData(local_data);
            }).catch(err=>{
                console.log(err)
            })
        }
    },[])

    function getData (){
        const body = formatText();
        if (body.length && data.title && data.author){
            const token = localStorage.getItem('__token');
            console.log({body, title:data.title, author:data.author}, token);
            axios.put('http://localhost:5000/nota', {
                    data:{
                        body, title:data.title, author:data.author
                    },
                    _id:search.note
                }, {headers:{token:token, 'oiahd':'oaihdoi'}}).then(res=>{
                console.log('res', res.data)
            }).catch(err=>console.log(err))
        } 
    }
    function formatText(){
        let text = data.body;
        text = text.split('\n');
        // console.log(text)

        if (text[0]) return text
        return [];
    }
    return (
        <>
            <ProtectedMiddleware/>
            <h1>HolaMundo desde la creacion de notas!</h1>
            <div className="box">
                <div className="row">
                    <FormSection aditional_class="col" value={data.title} text="Título:" id="title" type="text" handler={dataHandler}/>
                    <FormSection aditional_class="col" value={data.author} text="Título:" id="author" type="text" handler={dataHandler}/>
                    {/* <div className="form-group col">
                        <label htmlFor="author">Autor:</label>
                        <input type="text" className="form-control" value={author} id="author" name="author" placeholder="Juan Pérez"/>
                    </div> */}
                </div>
                <div className="form-group">
                    <label htmlFor="body">Texto:</label>
                    <textarea onChange={dataHandler} className="form-control" name="body" id="body" rows="3" value={data.body}></textarea>
                </div>
                <div className="btn-send-div">
                    <button onClick={getData} className="btn btn-primary">Enviar</button>
                </div>
            </div>

        </>
    );
}

export default NewNote;