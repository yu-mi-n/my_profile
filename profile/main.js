document.addEventListener("DOMContentLoaded", function() {
    
    const targets = document.querySelectorAll('.card');
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    targets.forEach(target => {
        observer.observe(target);
    });

    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let particlesArray;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.directionX = (Math.random() * 0.4) - 0.2; 
            this.directionY = (Math.random() * 0.4) - 0.2; 

            this.size = (Math.random() * 20) + 5; 

            this.color = 'rgba(173, 216, 230, 0.4)'; 
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x + this.size > width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = 30; 
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    initParticles();
    animate();
});