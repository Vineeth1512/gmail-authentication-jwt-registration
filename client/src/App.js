
import './App.css';
import React from 'react'
import { useEffect ,useState} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './Signup/Signup';
import Signin from './Login/Signin';
import ResetPassword from './ForgetPassword/ResetPassword';
import ChangePassword from './ChangePassword';
import HomeHeader from './Home/HomeHeader';

function App() {

  
var [isLoggedIn, setIsLoggedIn] = useState(false);
console.log(isLoggedIn);
 

useEffect(() => {
  var localStateValue = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (localStateValue == null) {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  } else {
    setIsLoggedIn(localStateValue);
  }
},[])

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomeHeader />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/forgetPassword" element={<ResetPassword />} />
        <Route path='/changePassword/:id/:token' element = {<ChangePassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
