import './App.css';
import React from 'react';
import Studio from './views/studio.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Studio></Studio>}></Route>
      </Routes>
      </BrowserRouter>
     );
}

export default App;
