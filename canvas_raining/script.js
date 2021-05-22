const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 500;

const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

// 타이틀 요소
let titleElement = document.getElementById("title1");
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: 20,
};

class Particle {
  constructor() {
    this.size = Math.random() * 15 + 1;
    this.x = Math.random() * canvas.width;
    this.y = 0 - Math.random() * 750;
    this.weight = Math.random() * 1 + 1;
    let direct = Math.random() * 1 + 0.75;
    this.directionX = Math.random() < 0.5 ? direct : -direct;
    // this.color = colors[parseInt((Math.random() * 6))];
    this.color = "rgba(50, 238, " + Math.random() * 254 + ", 0.7)";
  }

  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = Math.random() * 2 + 1;
      this.x = Math.random() * canvas.width;
    }
    this.weight += 0.02;
    this.y += this.weight;
    this.x += this.directionX;

    // 타이틀 요소 충돌 체크
    if (
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 4;
      this.weight *= -0.5;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((v) => {
    v.update();
    v.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurements = titleElement.getBoundingClientRect();
  title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 20,
  };
  init();
});
