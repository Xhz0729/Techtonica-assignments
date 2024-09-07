import React, { useContext, useState } from "react";
import { QuizContext } from "../Helper/Context";

const User = (props) => {
  const [value, setValue] = useState("");
  //get setGameState
  const { setGameState } = useContext(QuizContext);

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    props.grabUser(value);
    setValue("");
    setGameState("quiz");
  };

  return (
    <div className="message">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please enter your game to start!"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default User;
