import './style.css'

import ProtectedMiddleware from '../../components/generals/protected_midleware.jsx';
import { useNavigate } from "react-router-dom";

function ABMNotes() {
  const navigator = useNavigate();
  const notas = [
    {_id:'5536172',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'5536173',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'5536174',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'55361321',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'55361123',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'553613342',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'5536172431',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'5536172857',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'5536172545',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'55361725345',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'553617234',title:'Title', author:'John Doe', date:'22/01/2023'},
    {_id:'553617253',title:'Title', author:'John Doe', date:'22/01/2023'}   
  ];

  function createNote(){
    console.log('creating group');
    navigator('/crear-nota');
  }

  return (
    <>
      <ProtectedMiddleware/>
      <h1>HolaMundo desde el ABM</h1>
      <div className='btns'>
        <button onClick={createNote} className='btn btn-success'>Crear nueva notas</button>
      </div>
      
    </>
  );
}

export default ABMNotes;