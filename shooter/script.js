const game = document.getElementById('game');
const player = document.getElementById('player');
let playerX = window.innerWidth / 2 - 20;
let bullets = [];
let enemies = [];

// Move player
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    playerX -= 20;
  } else if (e.key === 'ArrowRight') {
    playerX += 20;
  } else if (e.key === ' ') {
    shoot();
  }

  playerX = Math.max(0, Math.min(window.innerWidth - 40, playerX));
  player.style.left = `${playerX}px`;
});

// Shoot bullet
function shoot() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = `${playerX + 17.5}px`;
  bullet.style.bottom = '60px';
  game.appendChild(bullet);
  bullets.push(bullet);
}

// Spawn enemy
function spawnEnemy() {
  const enemy = document.createElement('div');
  enemy.classList.add('enemy');
  enemy.style.top = '0px';
  enemy.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
  game.appendChild(enemy);
  enemies.push(enemy);
}

// Game loop
function gameLoop() {
  // Move bullets
  bullets.forEach((bullet, index) => {
    const bottom = parseInt(bullet.style.bottom);
    if (bottom > window.innerHeight) {
      bullet.remove();
      bullets.splice(index, 1);
    } else {
      bullet.style.bottom = `${bottom + 10}px`;
    }
  });

  // Move enemies
  enemies.forEach((enemy, eIndex) => {
    const top = parseInt(enemy.style.top);
    if (top > window.innerHeight) {
      enemy.remove();
      enemies.splice(eIndex, 1);
    } else {
      enemy.style.top = `${top + 3}px`;
    }

    // Collision detection
    bullets.forEach((bullet, bIndex) => {
      const bRect = bullet.getBoundingClientRect();
      const eRect = enemy.getBoundingClientRect();
      if (
        bRect.left < eRect.right &&
        bRect.right > eRect.left &&
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top
      ) {
        bullet.remove();
        enemy.remove();
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });

  requestAnimationFrame(gameLoop);
}

// Start game
setInterval(spawnEnemy, 1500);
requestAnimationFrame(gameLoop);
