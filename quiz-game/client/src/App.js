import "./App.css";
import React, { useState } from "react";
import { QuizContext } from "./Helper/Context";
import User from "./components/User";
import Quiz from "./components/Quiz";
import Ending from "./components/Ending";

function App() {
  // gameState
  const [gameState, setGameState] = useState("menu");

  return (
    <div className="App">
      <QuizContext.Provider value={{ gameState, setGameState }}>
        {gameState === "menu" && <User />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "ending" && <Ending />}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
