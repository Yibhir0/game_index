
import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Games from './components/games/games';
import GameView from './components/games/gameView';
import TopNav from './components/navbar/topnav';
import Profile from './components/user/profile'

export default function App() {
  return (
    <>
      <TopNav />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameView />} />
        <Route path="/Profile/:id" element={<Profile />} />
        {/* <Route path="/users/login" element={<SignIn />} /> */}
      </Routes>
    </>

  )
}




