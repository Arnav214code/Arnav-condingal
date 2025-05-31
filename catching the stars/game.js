const basket = document.getElementById('basket');
const star = document.getElementById('star');
const scoreDisplay = document.getElementById('score');

let score = 0;
let starFallingSpeed = 3;

// Basket movement
document.addEventListener('keydown', function(e) {
  const basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
  if (e.key === 'ArrowLeft' && basketLeft > 0) {
    basket.style.left = (basketLeft - 20) + "px";
  } else if (e.key === 'ArrowRight' && basketLeft < 540) {
    basket.style.left = (basketLeft + 20) + "px";
  }
});

// Falling star loop
function fallStar() {
  let starTop = parseInt(window.getComputedStyle(star).getPropertyValue("top"));
  let starLeft = parseInt(window.getComputedStyle(star).getPropertyValue("left"));
  let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));

  if (starTop >= 380) {
    // Check for catch
    if (starLeft > basketLeft - 20 && starLeft < basketLeft + 60) {
      score++;
      scoreDisplay.innerText = "Score: " + score;
    } else {
      alert("Game Over! Final Score: " + score);
      document.location.reload();
    }

    // Reset star
    star.style.top = "-30px";
    star.style.left = Math.floor(Math.random() * 580) + "px";
  } else {
    star.style.top = (starTop + starFallingSpeed) + "px";
  }

  requestAnimationFrame(fallStar);
}

// Start the game
fallStar();
