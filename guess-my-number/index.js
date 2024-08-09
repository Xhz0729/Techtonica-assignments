/* generate random number */
let randomNum;
const randomNumBtn = document.getElementById("generateNumber");
randomNumBtn.addEventListener("click", function () {
  const range = document.getElementById("numberRange").value;
  let min, max;
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
  // generate the random number btw min and max
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById("target").textContent = `${randomNum}`;
});

/* compare the input with random number */
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function () {
  const guess = parseInt(document.getElementById("userInput").value);
  const feedback = document.getElementById("feedback");
  // check whether the user input a number
  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number!";
    return;
  }
  if (guess < randomNum) {
    feedback.textContent = "Too low!";
  } else if (guess > randomNum) {
    feedback.textContent = "Too high!";
  } else {
    feedback.textContent = "You win!";
    return;
  }
});
