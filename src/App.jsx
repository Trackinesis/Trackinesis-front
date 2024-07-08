import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useUser } from "./hooks/useUser";
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import SignupStepTwo from './pages/signupStepTwo/SignupStepTwo';
import UserPage from './pages/userPage/UserPage';
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
import Leaderboard from './pages/leaderboard/Leaderboard';
import HistoricalTracking from './pages/historicalTracking/HistoricalTracking';
import MyPersonalRecords from './pages/myPersonalRecords/MyPersonalRecords';
import PersonalCalendar from './pages/calendar/PersonalCalendar';
import Stats from './pages/stats/Stats';

function App() {
    const { token } = useUser();

    useEffect(() => {
        const updateState = () => {
            // Logic to update state if necessary
        };
        window.addEventListener('storage', updateState);
        return () => window.removeEventListener('storage', updateState);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<PublicRoute />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="signupsteptwo" element={<SignupStepTwo />} />
                </Route>

                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/userpage" element={<UserPage />} />
                    <Route path='/personalcalendar' element={<PersonalCalendar />} />
                    <Route path="/createplan" element={<CreatePlan />} />
                    <Route path="/planslisted" element={<PlansListed />} />
                    <Route path="/createroutine" element={<CreateRoutine />} />
                    <Route path="/routineslisted" element={<RoutinesListed />} />
                    <Route path="/addexercise/:routineId" element={<AddExercise />} />
                    <Route path="/createexercise" element={<CreateExercise />} />
                    <Route path="/traininggoal" element={<TrainingGoal />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/addfriend" element={<AddFriend />} />
                    <Route path="/shareroutine" element={<ShareRoutine />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path='/leaderboard' element={<Leaderboard/>} />
                    <Route path='/historicaltracking' element={<HistoricalTracking/>} />
                    <Route path='/mypersonalrecords' element={<MyPersonalRecords/>} />
                    <Route path='/statistics' element={<Stats/>} />
                </Route>

                {/* Not Found */}
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
