const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let gameOver = false;

const jump = () => {
  if (!gameOver) {
    mario.style.bottom = '180px';
    setTimeout(() => {
      mario.style.bottom = '0';
    }, 500);
  }
}

const endGame = () => {
  gameOver = true;
  clearInterval(loop);
  mario.src = "./img/game-over.png";
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';

  setTimeout(() => {
    resetGame();
  }, 2000);
}

const resetGame = () => {
  gameOver = false;
  mario.src = "./img/mario.gif";
  mario.style.width = '150px';
  mario.style.marginLeft = '0';

  const cloudPosition = +window.getComputedStyle(document.querySelector('.clouds')).right.replace('px', '');
  const initialPipePosition = window.innerWidth - cloudPosition - 80;
  pipe.style.left = `${initialPipePosition}px`;

  pipe.style.animation = 'none';
  setTimeout(() => {
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
  }, 100);
}

const movePipe = () => {
  const cloudPosition = +window.getComputedStyle(document.querySelector('.clouds')).right.replace('px', '');
  const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '');
  pipe.style.left = `${window.innerWidth - cloudPosition - 80 - pipePosition}px`;
}

const loop = setInterval(() => {
  if (gameOver) {
    return;
  }

  movePipe();

  const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '');
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    endGame();
  }
}, 10);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

resetGame();

