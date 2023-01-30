import React, {useState} from "react";
import { useEffect } from "react";

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
            let data = {
                title: 'Titulo',
                author: 'John John',
                body: ['Hola','Mundo!']
            }
            data.body = data.body.join('\n');
    
            if (data.body) setData({...data,body:data.body});
            if (data.title) setData({... data, title:data.title});
            if (data.author) setData({...data, author:data.author});
        }
    },[])

    function getData (){
        const body = formatText();
        if (body.length && data.title && data.author){
            console.log({body, title:data.title, author:data.author});
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