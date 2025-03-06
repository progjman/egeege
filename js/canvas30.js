

const canvas = document.getElementById("neuronsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const neurons = [];
const numNeurons = 30;
const maxDistance = 100;
const totalTime = 30 * 60 * 1000;
const startTime = Date.now();
const stars = [];

// Создаём звёзды
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        brightness: Math.random() * 0.8 + 0.2
    });
}

// Создаём нейроны
for (let i = 0; i < numNeurons; i++) {
    neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2 - 10),
        targetY: null,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        inLowerZone: false
    });
}

function update() {
    let elapsedTime = Date.now() - startTime;
    let progress = Math.min(elapsedTime / totalTime, 1);
    let neuronsToMove = Math.floor(progress * numNeurons);

    for (let i = 0; i < neuronsToMove; i++) {
        let neuron = neurons[i];

        if (!neuron.inLowerZone) {
            neuron.inLowerZone = true;
            neuron.targetY = canvas.height / 2 + Math.random() * (canvas.height / 2);
        }

        if (neuron.targetY !== null) {
            neuron.y += (neuron.targetY - neuron.y) * 0.02;
        }
    }

    for (let neuron of neurons) {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        if (neuron.x <= 0 || neuron.x >= canvas.width) neuron.vx *= -1;

        if (neuron.inLowerZone) {
            if (neuron.y < canvas.height / 2) {
                neuron.y = canvas.height / 2;
                neuron.vy = Math.abs(neuron.vy);
            }
            if (neuron.y > canvas.height) {
                neuron.y = canvas.height;
                neuron.vy *= -1;
            }
        } else {
            if (neuron.y <= 0 || neuron.y >= canvas.height / 2 - 10) {
                neuron.vy *= -1;
            }
        }
    }
}

function draw() {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0a192f");
    gradient.addColorStop(1, "#030b17");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
            let dx = neurons[i].x - neurons[j].x;
            let dy = neurons[i].y - neurons[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(neurons[i].x, neurons[i].y);
                ctx.lineTo(neurons[j].x, neurons[j].y);
                ctx.stroke();
            }
        }
    }

    for (let neuron of neurons) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
