import './App.css';
import {Routes, Route} from 'react-router-dom';

import Index from './components/index/index.jsx';
import LogIn from './components/login/index.jsx'
import SignUp from './components/signup';
import Note from './components/note/index.jsx';
import NavBar from './components/nav/index.jsx'
import ABMNotes from './views/abm_notes';

function App() {
  return (
    <>
      <NavBar/>
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
