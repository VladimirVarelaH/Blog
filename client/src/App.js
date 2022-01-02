import './App.css';
import {Routes, Route} from 'react-router-dom';

import Index from './index/index.jsx';
import LogIn from './login/index.jsx'
import NavBar from './nav/index.jsx'

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<LogIn/>}/>
      </Routes>
    
    </>
  );
}

export default App;
