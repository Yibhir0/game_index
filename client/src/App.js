
import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Games from './components/games';
import GameView from './components/gameView';
import TopNav from './components/topnav';

export default function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameView />} />
      </Routes>
    </>
    
  )
}



