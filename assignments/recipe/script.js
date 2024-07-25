// adding a new ingredient
let newListEle = document.createElement('li');
newListEle.innerText = 'spoon for stirring'
document.getElementById('ingredients').appendChild(newListEle);

// change the color and font of all h2 elements
let h2EleList = document.querySelectorAll('h2');
h2EleList.forEach(function(h2) {
    h2.style.color = '#003366'; // Change the text color to dark blue
    h2.style.fontSize = '1.6rem'; // Change the font size (optional)
  });
