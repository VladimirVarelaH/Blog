import './App.css';
import {Routes, Route} from 'react-router-dom';

import Index from './components/index/index.jsx';
import LogIn from './components/login/index.jsx'
import SignUp from './components/signup';
import Note from './components/note/index.jsx';
import NavBar from './components/nav/index.jsx'
import LogedNav from './views/loged_nav';
import ABMNotes from './views/abm_notes';

import { useSelector } from 'react-redux';

function App() {
  const is_loged = useSelector((store)=>store.loginReducer.is_loged);
  let nav = <NavBar/>;

  if (is_loged){
    nav = <LogedNav/>;
  } 

  return (
    <>
      {nav}
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/:note' element={<Note/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/gestion-de-notas' element={<ABMNotes/>}/>
      </Routes>
    
    </>
  );
}

export default App;
