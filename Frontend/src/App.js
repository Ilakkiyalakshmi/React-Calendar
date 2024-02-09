import Calendar from './Calendar';
import RegisterPage from "./pages/RegisterPage";
import React, { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  // const [logged,setLogged] = useState(false);
  const [token,setToken] = useState(localStorage.getItem('token'));

  const [userEmail,setUserEmail]=useState(localStorage.getItem('userEmail'));

  //console.log(userEmail,"uuuu")
  
  

  return (
<div className="App">
        <BrowserRouter>
        <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                
                  
                <Route path="/login" element={<LoginPage setToken={setToken} setUserEmail={setUserEmail}/>} />
                <Route path="/dashboard" element={<Calendar token={token} setToken={setToken} userEmail={userEmail}/>} />
                
                
                <Route path="/" element={<Navigate to="/login" />} />
                
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
