import './App.css';
import './components/Register/Register.css';
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
      const newProjectExample = {
            userId: "665b28e287fa373281f47938",
            createdDate: "Sat Jul 20 2024 15:15:07 GMT-0300 (hora estándar de Argentina)",
            id: "669bfeab1dee1734c00a9a2d",
            projectName: "aaaaaaaaaaaaa",
            savedDate: "Sat Jul 20 2024 15:15:07 GMT-0300 (hora estándar de Argentina)",
            totalDuration: 0,
            channelList: []
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
