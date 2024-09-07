import React, { useContext } from "react";
import { QuizContext } from "../Helper/Context";

const Ending = () => {
  const { score, setScore, setUser, setGameState } = useContext(QuizContext);

  const restartQuiz = () => {
    setGameState("menu");
    setUser("");
    setScore(0);
  };
  return (
    <div className="ending">
      <h1>Thank you for playing the quiz game!</h1>
      <h3>Your score is: {score} / 5</h3>
      <button onClick={restartQuiz} className="restart">
        Restart Quiz
      </button>
    </div>
  );
};

export default Ending;
