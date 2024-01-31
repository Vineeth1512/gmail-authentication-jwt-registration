
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Signup/Signup';
import Signin from './Login/Signin';
import ResetPassword from './ForgetPassword/ResetPassword';
import ChangePassword from './ChangePassword';
import UserDetails from './UserDetails/UserDetails';
import HomeHeader from './Home/HomeHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeHeader/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/forgetPassword" element={<ResetPassword />} />
        <Route path='/reset-password/:id/:token' element={<ChangePassword />} />
        <Route path='/details' element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
