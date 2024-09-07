import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../Helper/Context";

const Quiz = () => {
  // track my score
  const { score, setScore } = useContext(QuizContext);
  // change my game state
  const { setGameState } = useContext(QuizContext);

  // questions state
  const [questions, setQuestions] = useState([]);
  //question index state
  const [questionIdx, setQuestionIdx] = useState(0);
  // track user choice
  const [optionChosen, setOptionChosen] = useState("");

  // Load the questions from the backend
  const loadData = () => {
    fetch("http://localhost:8000/api/game")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  useEffect(() => {
    loadData();
  }, []);

  // next question btn event handler
  const nextQuestion = () => {
    // update score
    if (optionChosen === questions[questionIdx].correct_answer) {
      setScore(score + 1);
    }
    // alert right answer
    else {
      alert(`The right answer is ${questions[questionIdx].correct_answer}`);
    }
    // go to next question
    setQuestionIdx(questionIdx + 1);
    // Reset the optionChosen to ensure the user selects an option for the next question
    setOptionChosen(null);
  };

  // finish Quiz handler
  const finishQuiz = () => {
    if (questions[questionIdx].correct_answer === optionChosen) {
      // Set the new score
      setScore(score + 1);
    } else {
      alert(`The right answer is ${questions[questionIdx].correct_answer}`);
    }
    // rendering page to ending screen
    setGameState("ending");
  };

  return (
    <div className="quiz">
      {/* Render your quiz questions, fetching takes time, first check whether we get the quiz data */}
      {questions.length > 0 ? (
        <div>
          {/* Quiz logic goes here */}
          <h2>{questions[questionIdx].question}</h2>
          <div className="options">
            <button onClick={() => setOptionChosen("True")}>True</button>
            <button onClick={() => setOptionChosen("False")}>False</button>
          </div>
          <div className="processBtn">
            {questionIdx === questions.length - 1 ? (
              <button onClick={finishQuiz} className="finishBtn">
                {" "}
                Finish Quiz{" "}
              </button>
            ) : (
              <button onClick={nextQuestion} className="nextBtn">
                Next question
              </button>
            )}
          </div>
          <div className="score">
            <h2>Your current score is {score}</h2>
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
