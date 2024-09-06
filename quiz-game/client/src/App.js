import "./App.css";
import React, { useState } from "react";
import { QuizContext } from "./Helper/Context";
import User from "./components/User";
import Quiz from "./components/Quiz";
import Ending from "./components/Ending";

function App() {
  // gameState
  const [gameState, setGameState] = useState("menu");

  // update my user info
  const [user, setUser] = useState("");

  const handleUser = (text) => {
    setUser(text);
  };

  return (
    <div className="App">
      <h1>Welcome to my game {user}</h1>
      <QuizContext.Provider value={{ gameState, setGameState, user, setUser }}>
        {gameState === "menu" && <User grabUser={handleUser} />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "ending" && <Ending />}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
