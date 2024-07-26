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

// adding checkbox to all my ingredients
let ingredientsList = document.querySelector('#ingredients');
let ingredientEles = ingredientsList.querySelectorAll('li');

// Iterate over each list item
ingredientEles.forEach(function(item, index) {
  // Create a new checkbox input element
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'ingredient-' + index;

  // Create a new label element
  let label = document.createElement('label');
  // Set the label's "for" attribute to the checkbox's ID
  label.htmlFor = checkbox.id; 
  label.textContent = item.textContent; 

  // Clear the original text content of the list item
  item.textContent = '';

  // Append the checkbox and label to the list item
  item.appendChild(checkbox);
  item.appendChild(label);
  // adding a strikethrough by adding checked eventListener
  checkbox.addEventListener('click', function() {
    if (checkbox.checked) {
        item.classList.add('checked');
    } else {
      item.classList.remove('checked');
    }
  });
});
