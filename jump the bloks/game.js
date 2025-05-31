const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');

document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !player.classList.contains('jump')) {
    player.classList.add('jump');
    setTimeout(() => {
      player.classList.remove('jump');
    }, 500);
  }
});

// Collision Detection
setInterval(() => {
  const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  if (obstacleLeft > 550 && obstacleLeft < 580 && playerTop < 30) {
    alert("Game Over! Refresh to try again.");
  }
}, 10);
