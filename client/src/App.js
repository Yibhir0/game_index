
import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './components/home';
import Games from './components/games';
import GameView from './components/gameView'

function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route exact path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameView />} />


      </Routes>
    </div>
  )
}


export default App;

