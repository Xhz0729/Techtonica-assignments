let coin = document.querySelector('#coin');
let playBtn = document.querySelector('#playBtn');
let resetBtn = document.querySelector('#resetBtn');

let heads = 0;
let tails = 0;
playBtn.addEventListener('click', () => {
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = 'none';
    if (i) {
        setTimeout(function(){
            coin.style.animation = 'heads-spin 3s forwards'
        }, 100);
        heads++;
    }

    else {
        setTimeout(function(){
            coin.style.animation = 'tails-spin 3s forwards';
        }, 100);
        tails++;
    }
    setTimeout(updateStates, 3000);
});

function updateStates() {
    document.querySelector('#headsCount').textContent = `Heads: ${heads}`;
    document.querySelector('#tailsCount').textContent = `Tails: ${tails}`;
}

// active the reset btn
resetBtn.addEventListener("click", () => {
    coin.style.animation = 'none';
    heads = 0;
    tails = 0;
    updateStates();
});



