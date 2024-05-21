import React from 'react'
import Login from './pages/login/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import SignupStepTwo from './pages/signupStepTwo/SignupStepTwo'
import UserPage from './pages/userPage/UserPage'
import CreatePlan from "./pages/createPlan/CreatePlan";
import AddExercise from "./pages/addExercise/AddExercise";
import PlansListed from "./pages/plansListed/PlansListed";
import CreateRoutine from "./pages/createRoutine/CreateRoutine";
import CreateExercise from "./pages/createExercise/CreateExercise";
import AuthProvider from "./context/AuthContext";
import RoutinesListed from "./pages/routinesListed/RoutinesListed";
import Social from "./pages/social/Social";
import AddFriend from "./pages/addFriend/AddFriend";
import ShareRoutine from "./pages/shareRoutine/ShareRoutine";
import Friends from "./pages/friends/Friends";

function App() {
  return (
      <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/signupsteptwo' element={<SignupStepTwo />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/userpage' element={<UserPage />}></Route>
                    <Route path='/createplan' element={<CreatePlan />}></Route>
                    <Route path='/planslisted' element={<PlansListed/>}></Route>
                    <Route path='/createroutine' element={<CreateRoutine/>}></Route>
                    <Route path='/routineslisted' element={<RoutinesListed/>}></Route>
                    <Route path='/addexercise' element={<AddExercise />}></Route>
                    <Route path='/createexercise' element={<CreateExercise/>}></Route>
                    <Route path='/social' element={<Social/>}></Route>
                    <Route path='/addfriend' element={<AddFriend/>}></Route>
                    <Route path='/shareroutine' element={<ShareRoutine/>}></Route>
                    <Route path='/friends' element={<Friends/>}></Route>
                    <Route path='*' element={<h1>Not Found</h1>}></Route>
                </Routes>
            </BrowserRouter>
      </AuthProvider>
  )
}    
      
export default App
