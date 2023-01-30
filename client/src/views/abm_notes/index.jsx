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

  function editNote(id){
    navigator(`/crear-nota?note=${id}`);
    console.log(id);
  }
  function deleteNote(id){
    console.log(id);
  }

  return (
    <>
      <ProtectedMiddleware/>
      <div className="box">
        <h1>HolaMundo desde el ABM</h1>
        <div className='btns'>
          <button onClick={createNote} className='btn btn-success'>Crear nueva notas</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Autor</th>
              <th scope="col">Titulo</th>
              <th scope="col">Fecha</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((el, index)=>{
              return (
                <tr key={index}>
                  <td>{el.title}</td>
                  <td>{el.author}</td>
                  <td>{el.date}</td>
                  <td className='actions'>
                    <button onClick={()=>{editNote(el._id)}} className='btn btn-sm btn-success'>Editar</button>
                    <button onClick={()=>{deleteNote(el._id)}} className='btn btn-sm btn-danger'>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
    </>
  );
}

export default ABMNotes;