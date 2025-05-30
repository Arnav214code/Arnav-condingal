const game = document.getElementById('game');
const scope = document.getElementById('scope');
const scoreBoard = document.getElementById('score');

let score = 0;

// Move sniper scope with mouse
document.addEventListener('mousemove', (e) => {
  scope.style.left = `${e.clientX - 30}px`;
  scope.style.top = `${e.clientY - 30}px`;
});

// Spawn a target
function spawnTarget() {
  const target = document.createElement('div');
  target.classList.add('target');
  
  const x = Math.random() * (window.innerWidth - 40);
  const y = Math.random() * (window.innerHeight - 40);
  
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.addEventListener('click', () => {
    score += 1;
    scoreBoard.textContent = `Score: ${score}`;
    target.remove();
  });

  game.appendChild(target);

  // Auto remove if not shot
  setTimeout(() => {
    if (game.contains(target)) {
      target.remove();
    }
  }, 2000);
}

// Keep spawning targets
setInterval(spawnTarget, 1500);

