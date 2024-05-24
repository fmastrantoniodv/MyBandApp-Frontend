import './App.css';
import './components/Register/Register.css';
import React from 'react';
import Studio from './views/studio.jsx'
import Login from './views/login.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './views/register.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/studio' element={<Studio></Studio>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      </Routes>
      </BrowserRouter>
     );
}

export default App;
