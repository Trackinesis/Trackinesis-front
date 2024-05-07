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
import Routine from "./pages/routine/Routine";
import CreateExercise from "./pages/createExercise/CreateExercise";
import AuthProvider from "./context/AuthContext";
import TrainingGoal from "./pages/trainingGoal/TrainingGoal";

function App() {
  return (
      <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/signupsteptwo' element={<SignupStepTwo />}></Route>
                    <Route path='/userpage' element={<UserPage />}></Route>
                    <Route path='/createplan' element={<CreatePlan />}></Route>
                    <Route path='/addexercise' element={<AddExercise />}></Route>
                    <Route path='/planslisted' element={<PlansListed/>}></Route>
                    <Route path='/routine' element={<Routine/>}></Route>
                    <Route path='/createexercise' element={<CreateExercise/>}></Route>
                    <Route path='/traininggoal' element={<TrainingGoal/>}></Route>
                    <Route path='*' element={<h1>Not Found</h1>}></Route>
                </Routes>
            </BrowserRouter>
      </AuthProvider>
  )
}    
      
export default App
