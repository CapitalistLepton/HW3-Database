window.onload = main;

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function (callback, element) {
           window.setTimeout(callback, 1000 / 60);
         };
})();

function main() {
  const canvas = document.getElementById('gameWorld');
  const ctx = canvas.getContext('2d');

  const life = new Life();
  const game = new GameEngine(ctx, life);

  const button = document.getElementById('pause');
  button.onclick = function () {
    game.paused = !game.paused;
  };

  game.start();
}

class GameEngine {
  constructor(ctx, life) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.paused = false;
    this.life = life;
    console.log('Initialized the game');
  }

  start() {
    console.log('Starting the game');
    let that = this;
    let counter = 0;
    (function gameLoop() {
       if (counter % 5 === 0 && !that.paused) {
         that.loop();
       }
       requestAnimFrame(gameLoop, that.ctx.canvas);
       counter++;
    })();
  }

  loop() {
    this.draw();
    this.life.tick();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();
    this.life.draw(this.ctx);
    this.ctx.restore();
  }
}
