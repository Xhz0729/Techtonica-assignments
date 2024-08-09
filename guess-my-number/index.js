/* generate random number */
const randomNumBtn = document.getElementById('generateNumber');
randomNumBtn.addEventListener('click', function() {
    const range = document.getElementById('numberRange').value;
    let min, max;
    switch(range) {
        case '0-100':
            min = 0;
            max = 100;
            break;
        case '100-1000':
            min = 100;
            max = 1000;
            break;
        case '1000-5000':
            min = 1000;
            max = 5000;
            break;
        case '5000-10000':
            min = 5000;
            max = 10000;
            break;
    }
    // generate the random number btw min and max
    const randomNum = Math.floor(Math.random()*(max - min + 1)) + min;
    console.log(randomNum);
})

