import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useUser } from "./hooks/useUser";
import Login from './pages/login/Login'
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
    const {token} = useUser();

    useEffect(() => {
        const updateState = () => {}
        window.addEventListener('storage', updateState())
        return () => window.removeEventListener('storage', updateState())
    }, []);


  return (
            <Router>
                <Routes>
                    {/*Public routes*/}
                    <Route path='/' element={<PublicRoute component={Login} />} />
                    <Route path='/signup' element={<PublicRoute component={Signup} />} />
                    <Route path='/signupsteptwo' element={<PublicRoute component={SignupStepTwo} />} />

                    {/*Private routes*/}
                    <Route path='/home' element={<PrivateRoute component={Home} />} />
                    <Route path='/userpage' element={<PrivateRoute component={UserPage} />} />
                    <Route path='/createplan' element={<PrivateRoute component={CreatePlan} />} />
                    <Route path='/planslisted' element={<PrivateRoute component={PlansListed} />} />
                    <Route path='/createroutine' element={<PrivateRoute component={CreateRoutine} />} />
                    <Route path='/routineslisted' element={<PrivateRoute component={RoutinesListed} />} />
                    <Route path='/addexercise' element={<PrivateRoute component={AddExercise} />} />
                    <Route path='/createexercise' element={<PrivateRoute component={CreateExercise} />} />
                    <Route path='/traininggoal' element={<PrivateRoute component={TrainingGoal} />} />
                    <Route path='/social' element={<PrivateRoute component={Social} />} />
                    <Route path='/addfriend' element={<PrivateRoute component={AddFriend} />} />
                    <Route path='/shareroutine' element={<PrivateRoute component={ShareRoutine} />} />
                    <Route path='/friends' element={<PrivateRoute component={Friends} />} />

                    <Route path='*' element={<h1>Not Found</h1>}></Route>
                </Routes>
            </Router>
  )
}    
      
export default App
