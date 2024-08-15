import React from "react";

interface RangeProps {
  range: string;
  setRange: (value: string) => void;
}

const Range: React.FC<RangeProps> = ({ range, setRange }) => {
  return (
    <section className="range">
      <label htmlFor="numberRange">
        Please choose the range of the number:
      </label>
      <select
        id="numberRange"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      >
        <option id="option1" value="0-100">
          0~100
        </option>
        <option id="option2" value="100-1000">
          100~1000
        </option>
        <option id="option3" value="1000-5000">
          1000~5000
        </option>
        <option id="option4" value="5000-10000">
          5000~10000
        </option>
      </select>
    </section>
  );
};

export default Range;
