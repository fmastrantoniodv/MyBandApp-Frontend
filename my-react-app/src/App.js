import './App.css';
import './components/Register/Register.css';
import React from 'react';
import Studio from './views/studio.jsx'
import Register from './views/register.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/studio' element={<Studio></Studio>}></Route>
      <Route path='/' element={<Register texto={"Hola mundo"}/>}></Route>
      </Routes>
      </BrowserRouter>
     );
}

export default App;
