import './App.css';
import React from 'react';
import Inicio from './components/inicio'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Inicio></Inicio>}></Route>
      </Routes>
      </BrowserRouter>
     );
}

export default App;
