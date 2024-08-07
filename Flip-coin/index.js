let coin = document.querySelector('#coin');
let playBtn = document.querySelector('#playBtn');
let resetBtn = document.querySelector('#resetBtn');

playBtn.addEventListener('click', () => {
    let i = Math.floor(Math.random() * 2);
    if (i) {
        setTimeout(function(){
            coin.style.animation = 'heads-spin 3s forwards'
        }, 100);
    }
    else {
        setTimeout(function(){
            coin.style.animation = 'tails-spin 4s forwards';

        }, 100);
    }
})
