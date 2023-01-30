import React, {useEffect} from "react";
import './style.css'

function NewNote(){

    function formatText(){
        let text = document.getElementById('body').value;
        text = text.split('\n');
        if (text[0]){
            console.log(text)
        } else {
            console.log('empty')
        }
    }
    return (
        <>
            <h1>HolaMundo desde la creacion de notas!</h1>
            <div className="box">
                <div className="row">
                    <div className="form-group col">
                        <label for="title">Titulo:</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Mi Título de Prueba"/>
                    </div>
                    <div className="form-group col">
                        <label for="author">Autor:</label>
                        <input type="text" className="form-control" id="author" name="author" placeholder="Juan Pérez"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="body">Texto:</label>
                    <textarea className="form-control" id="body" rows="3"></textarea>
                </div>
                <div className="btn-send-div">
                    <button onClick={formatText} className="btn btn-primary">Enviar</button>
                </div>
            </div>

        </>
    );
}

export default NewNote;