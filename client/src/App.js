
import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Games from './components/games/games';
import GameView from './components/games/gameView';
import TopNav from './components/navbar/topnav';
import UserProfile from './components/user/userProfile'

export default function App() {
  return (
    <div className="bg-gradient-to-br from-gray-400 to-stone-100">
      <TopNav />
      <Routes>


        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameView />} />
        <Route path="/Profile/:id" element={<UserProfile />} />
        {/* <Route path="/users/login" element={<SignIn />} /> */}
      </Routes>
    </div>

  )
}




