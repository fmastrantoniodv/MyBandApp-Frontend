import './App.css';
import './components/Register/Register.css';
import './components/Home/Home.css';
import React from 'react';
import Studio from './views/studio.jsx'
import Login from './views/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './views/register.jsx';
import { Home } from './views/home';
import { UserProvider } from './contexts/UserContext';

function App() {

      return (
            <UserProvider>
                  <BrowserRouter>
                        <Routes>
                              <Route path='/' element={<Login />}></Route>
                              <Route path='/register' element={<Register />}></Route>
                              <Route path='/studio' element={<Studio></Studio>}></Route>
                              <Route path='/home' element={<Home></Home>}></Route>
                        </Routes>
                  </BrowserRouter>
            </UserProvider>
      );
}

export default App;
