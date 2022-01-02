import React from "react";
import {useParams} from 'react-router-dom';

function Note(){
    const params = useParams()
    return(
        <div>
            <div>
                <h1>{params.note}</h1>
                <p>Por:</p>
                <hr />
            </div>
            <p></p>
        </div>
    );
}

export default Note;
