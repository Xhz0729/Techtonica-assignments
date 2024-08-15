import React from "react";

interface UserInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  submitBtn: () => void;
}

const UserInput: React.FC<UserInputProps> = ({
  userInput,
  setUserInput,
  submitBtn,
}) => {
  return (
    <>
      <section className="guess-part">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="userInput">Please make your guess below:</label>
          <input
            type="text"
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <input type="button" id="submit" value="submit" onClick={submitBtn} />
        </form>
      </section>
    </>
  );
};

export default UserInput;
