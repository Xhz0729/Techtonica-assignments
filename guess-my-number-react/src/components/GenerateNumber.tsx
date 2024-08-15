import React from "react";
interface GenerateNumberProps {
    generateRandomNumber: () => void;
    feedback: string;
}
const GenerateNumber: React.FC<GenerateNumberProps> =  ({ generateRandomNumber, feedback }) => {
  return (
    <>
      <section>
        <h2>Please hit the button to generate a random number</h2>
        <button id="generateNumber" onClick={generateRandomNumber}>Generate Random Number</button>
        <p id="target">{feedback}</p>
      </section>
    </>
  );
};

export default GenerateNumber;