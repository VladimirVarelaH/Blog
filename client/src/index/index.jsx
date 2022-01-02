import React, {useEffect} from "react";

import './style.css'

function Index(){
    const notas = [
        {'title':'Example', 'author':'Vlado', 'body':'Lorem Ipsum dolorem','date':'02-01-2022'},
        {'title':'Example1', 'author':'Vlado', 'body':'Lorem Ipsum dolorem','date':'02-01-2022'},
        {'title':'Example2', 'author':'Vlado', 'body':'Lorem Ipsum dolorem','date':'02-01-2022'},
        {'title':'Example3', 'author':'Vlado', 'body':'Lorem Ipsum dolorem','date':'02-01-2022'}
    ]
    let key = 0;
    return(
        <div className="conteiner">
            <h1>Index</h1>
            {notas.map(n=>{
                key+=1
                return(
                <div className="note" key={key}>
                    <h4>{n.title}</h4>
                    <div className="foot">
                        <p>Por: {n.author}</p>
                        <p>{n.date}</p>
                    </div>
                </div>
                )})}
        </div>
        
    );
}

export default Index;