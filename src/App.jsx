import React from 'react'
import Login from './pages/login/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import SignupStepTwo from './pages/signupStepTwo/SignupStepTwo'
import UserPage from './pages/userPage/UserPage'
import CreatePlan from "./pages/createPlan/createPlan";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/signupsteptwo' element={<SignupStepTwo />}></Route>
            <Route path='/userpage' element={<UserPage />}></Route>
            <Route path='/createplan' element={<CreatePlan />}></Route>
        </Routes>
    </BrowserRouter>
  )
}    
      
export default App
