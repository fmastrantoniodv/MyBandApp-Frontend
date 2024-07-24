import './App.css';
import './css/register.css';
import './css/home.css';
import './css/collections.css';
import React from 'react';
import Studio from './views/studio.jsx'
import Login from './views/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './views/register.jsx';
import { Home } from './views/home.jsx';
import Collections from './views/collections.jsx';
import { UserProvider } from './contexts/UserContext';

function App() {
      const projectIdExample = '6670f16ce0514db5f7b74e1e';
      const newProjectExample = {
            projectId: null,
            userId: '665b28e287fa373281f47938',
            projectName: 'Proyecto en blanco',
            template: 'blank'
      }
          
      return (
            <UserProvider>
                  <BrowserRouter>
                        <Routes>
                              <Route path='/' element={<Login />}></Route>
                              <Route path='/register' element={<Register />}></Route>
                              <Route path='/studio' element={<Studio projectInfo={newProjectExample} />}></Route>
                              <Route path='/home' element={<Home />}></Route>
                              <Route path='/collections' element={<Collections />}></Route>
                        </Routes>
                  </BrowserRouter>
            </UserProvider>
      );
}

export default App;
