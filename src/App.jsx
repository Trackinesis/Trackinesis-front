import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Login from './pages/login/Login'
import { Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import SignupStepTwo from './pages/signupStepTwo/SignupStepTwo'
import UserPage from './pages/userPage/UserPage'
import CreatePlan from "./pages/createPlan/CreatePlan";
import AddExercise from "./pages/addExercise/AddExercise";
import PlansListed from "./pages/plansListed/PlansListed";
import CreateRoutine from "./pages/createRoutine/CreateRoutine";
import CreateExercise from "./pages/createExercise/CreateExercise";
import TrainingGoal from "./pages/trainingGoal/TrainingGoal";
import RoutinesListed from "./pages/routinesListed/RoutinesListed";
import Social from "./pages/social/Social";
import AddFriend from "./pages/addFriend/AddFriend";
import ShareRoutine from "./pages/shareRoutine/ShareRoutine";
import Friends from "./pages/friends/Friends";

function App() {
  return (
            <Router>
                <Routes>
                    {/*Public routes*/}
                    <Route path={'/'} element={<PublicRoute />}>
                        <Route path={'/'} element={<Login />} />
                    </Route>
                    <Route path={'/signup'} element={<PublicRoute />}>
                        <Route path={'/signup'} element={<Signup />} />
                    </Route>
                    <Route path={'/signupsteptwo'} element={<PublicRoute />}>
                        <Route path={'/signupsteptwo'} element={<SignupStepTwo />} />
                    </Route>

                    {/*Private routes*/}
                    <Route path={'/home'} element={<PrivateRoute />}>
                        <Route path={'/home'} element={<Home />} />
                    </Route>
                    <Route path={'/userpage'} element={<PrivateRoute />}>
                        <Route path={'/userpage'} element={<UserPage />} />
                    </Route>
                    <Route path={'/createplan'} element={<PrivateRoute />}>
                        <Route path={'/createplan'} element={<CreatePlan />} />
                    </Route>
                    <Route path={'/planslisted'} element={<PrivateRoute />}>
                        <Route path={'/planslisted'} element={<PlansListed/>} />
                    </Route>
                    <Route path={'/createroutine'} element={<PrivateRoute />}>
                        <Route path={'/createroutine'} element={<CreateRoutine/>} />
                    </Route>
                    <Route path={'/routineslisted'} element={<PrivateRoute />}>
                        <Route path={'/routineslisted'} element={<RoutinesListed/>} />
                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={} element={<PrivateRoute />}>

                    </Route>
                    <Route path={'/addexercise'} element={<AddExercise />}></Route>
                    <Route path={'/createexercise'} element={<CreateExercise/>}></Route>
                    <Route path={'/traininggoal'} element={<TrainingGoal/>}></Route>
                    <Route path={'/social'} element={<Social/>}></Route>
                    <Route path={'/addfriend'} element={<AddFriend/>}></Route>
                    <Route path={'/shareroutine'} element={<ShareRoutine/>}></Route>
                    <Route path={'/friends'} element={<Friends/>}></Route>

                    <Route path='*' element={<h1>Not Found</h1>}></Route>
                </Routes>
            </Router>
  )
}    
      
export default App
