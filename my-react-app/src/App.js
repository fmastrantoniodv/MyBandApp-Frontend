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
import { ChangePassword } from './views/changePassword.jsx';
import { ForgotPassword } from './views/forgotPassword';
import Collections from './views/collections.jsx';
import { UserProvider } from './contexts/UserContext';

function App() {   
      return (
            <UserProvider>
                  <BrowserRouter>
                        <Routes>
                              <Route path='/' element={<Login />}/>
                              <Route path='/register' element={<Register />}/>
                              <Route path='/studio' element={<Studio />}/>
                              <Route path='/home' element={<Home />}/>
                              <Route path='/changePass' element={<ChangePassword />}/>
                              <Route path='/forgotPass' element={<ForgotPassword />}/>
                              <Route path='/collections' element={<Collections />}/>
                        </Routes>
                  </BrowserRouter>
            </UserProvider>
      );
}

export default App;
