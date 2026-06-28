import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react'
import './index.css'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'  

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Root />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}
//Defince the root component to handle the initial redirect
const Root = () => {
  //Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token');

  //Redirect to dashboard if authenticated, otherwise redirect to login
  return isAuthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />);
};
export default App
