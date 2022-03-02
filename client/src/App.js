
import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Games from './components/games/games';
import GameView from './components/games/gameView';
import TopNav from './components/topnav';

export default function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameView />} />
        {/* <Route path="/games/:id/feedback" element={<GameView />} /> */}
      </Routes>
    </>

  )
}



