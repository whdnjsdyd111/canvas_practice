const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// mouse
let mouse = {
    x: null,
    y: null,
    radius: 100,
};

window.addEventListener("mousemove", function (e) {
    mouse.x = e.x + canvas.clientLeft / 2;
    mouse.y = e.y + canvas.clientTop / 2;
});

function drawImage() {
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    class Particle {
        constructor(x, y, color, size) {
            this.x = x + canvas.width / 2 - png.width * 2;
            this.y = y + canvas.height / 2 - png.height * 2;
            this.color = color;
            this.size = size;
            this.baseX = x + canvas.width / 2 - png.width * 2;
            this.baseY = y + canvas.height / 2 - png.height * 2;
            this.density = Math.random() * 10 + 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            ctx.fillStyle = this.color;

            // 충돌 감지
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectX = dx / distance;
            let forceDirectY = dy / distance;

            // 충돌 최대 거리 설정
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) force = 0;

            let directionX = forceDirectX * force * this.density;
            let directionY = forceDirectY * force * this.density;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 20;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 20;
                }
            }
            this.draw();
        }
    }

    function init() {
        particleArray = [];

        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                let positionX = x;
                let positionY = y;
                let color =
                    "rgb(" +
                    data.data[y * 4 * data.width + x * 4] +
                    "," +
                    data.data[y * 4 * data.width + x * 4 + 1] +
                    "," +
                    data.data[y * 4 * data.width + x * 4 + 2] +
                    ")";
                particleArray.push(
                    new Particle(positionX * 6, positionY * 6, color, 3)
                );
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, innerWidth, innerHeight);

        particleArray.forEach((v) => {
            v.update();
        });
    }

    init();
    animate();

    window.addEventListener("resize", function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });
}

const png = new Image();
png.src =
    "data:image/png;base64,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";

window.addEventListener("load", (e) => {
    ctx.drawImage(png, 0, 0);
    drawImage();
});
