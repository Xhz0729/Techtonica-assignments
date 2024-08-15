import React, { useState } from "react";
import Range from "./Range";
import GenerateNumber from "./GenerateNumber";
import UserInput from "./UserInput";
import'./index.css'

const Display: React.FC = () => {
  // range state
  const [range, setRange] = useState("0-100");

  // feedback state, being changed when hit the Generate Random Number btn
  const [feedback, setFeedback] = useState("");

  // randomNum state, being changed when hit the Generate Random Number btn
  const [randomNum, setRandomNum] = useState<number | null>(null);

  // guessCnt state, being changed when one worng guess made
  const [guessCnt, setGuessCnt] = useState(0);

  // guessedNumbers state, being changed when one worng guess made
  const [guessedNumbers, setGuessedNumbers] = useState<number[]>([]);

  // userInput state, being changed when user makes a new input
  const [userInput, setUserInput] = useState("");

  // declare the generateRandomNumber fuc
  const generateRandomNumber = () => {
    // using range to determin my min and max for later use
    let min = 0,
      max = 100;
    switch (range) {
      case "0-100":
        min = 0;
        max = 100;
        break;
      case "100-1000":
        min = 100;
        max = 1000;
        break;
      case "1000-5000":
        min = 1000;
        max = 5000;
        break;
      case "5000-10000":
        min = 5000;
        max = 10000;
        break;
    }
    // generate the random number
    const newRandomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    // update randomNum
    setRandomNum(newRandomNum);
    // update feedback
    setFeedback("Random number generated, please start guessing");
    // reset guessCnt, guessedNumbers and userInput
    setGuessCnt(0);
    setGuessedNumbers([]);
    setUserInput("");
  };

  // handle user input
  const submitBtn = () => {
    const input = parseInt(userInput);
    if (isNaN(input)) {
      setFeedback("Please enter a valid number");
    }
    if (randomNum !== null) {
      if (input < randomNum) {
        setFeedback("Too low!");
        setGuessCnt(guessCnt + 1);
      } else if (input > randomNum) {
        setFeedback("Too high!");
        setGuessCnt(guessCnt + 1);
      } else {
        setFeedback("You win!");
        return;
      }
      if (input !== randomNum) {
        setGuessedNumbers([...guessedNumbers, input]);
      }
    }
  };

  return (
    <div className="game-container">
      <section id="description">
        <h1>Welcome to Guess Number Game</h1>
      </section>
      <Range range={range} setRange={setRange} />
      <GenerateNumber
        generateRandomNumber={generateRandomNumber}
        feedback={feedback}
      />
      <UserInput
        userInput={userInput}
        setUserInput={setUserInput}
        submitBtn={submitBtn}
      />
      <p id="count">Guesses made so far: {guessCnt}</p>
      <p id="guessedNumbers">
        Numbers guessed so far: {guessedNumbers.join(", ")}
      </p>
    </div>
  );
};

export default Display;
