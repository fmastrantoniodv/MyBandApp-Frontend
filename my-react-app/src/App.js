import './App.css';
import './css/register.css';
import './css/home.css';
import './css/collections.css';
import React from 'react';
import Studio from './views/studio.jsx'
import Login from './views/login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './views/register.jsx';
import { Home } from './views/home.jsx';
import { ChangePassword } from './views/changePassword.jsx';
import { ForgotPassword } from './views/forgotPassword';
import { ValidateOtc } from './views/validateOtc';
import { Collections } from './views/collections.jsx';
import { UserProvider } from './contexts/UserContext';
import { PrivateViews } from './views/PrivateViews';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {

      return (
            <SettingsProvider>
                  <UserProvider>
                        <BrowserRouter>
                              <Routes>
                                    <Route path='/' element={<Login />}/>
                                    <Route path='/register' element={<Register />}/>
                                    <Route path='/forgotPass' element={<ForgotPassword />}/>
                                    <Route path='/validateOtc' element={<ValidateOtc />}/>
                                    <Route element={<PrivateViews />}>
                                          <Route path='/home' element={<Home />}/>
                                          <Route path='/studio' element={<Studio />}/>
                                          <Route path='/changePass' element={<ChangePassword />}/>
                                          <Route path='/collections' element={<Collections />}/>
                                    </Route>
                              </Routes>
                        </BrowserRouter>
                  </UserProvider>
            </SettingsProvider>                  
      );
}

export default App;
