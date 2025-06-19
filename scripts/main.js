// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const parallaxWrapper = document.querySelector('.parallax-wrapper');
    if (!parallaxWrapper) return;

    const layers = document.querySelectorAll('.parallax-layer');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate mouse position relative to center (in percentage)
    const moveX = (mouseX - centerX) / centerX;
    const moveY = (mouseY - centerY) / centerY;

    layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 1;
        const x = moveX * 50 * speed;
        const y = moveY * 50 * speed;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1 + speed})`;
    });
});

// Scroll Parallax Effect
window.addEventListener('scroll', () => {
    const parallax = document.getElementById('parallax');
    if (!parallax) return;

    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;

    // Move layers at different speeds
    document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 1;
        const yPos = -(rate * speed);
        layer.style.transform = `translate3d(0, ${yPos}px, 0) scale(${1 + speed})`;
    });

    // Add subtle rotation to floating icons
    document.querySelectorAll('.floating-icon').forEach(icon => {
        const rotation = Math.sin(scrolled * 0.002) * 5;
        icon.style.transform = `rotate(${rotation}deg)`;
    });
});

// Adiciona partículas em movimento
function createParticle() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Estilo da partícula
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: -10px;
        animation: fall ${Math.random() * 3 + 2}s linear forwards;
    `;

    particles.appendChild(particle);

    // Remove a partícula após a animação
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Cria partículas periodicamente
setInterval(createParticle, 100);

// Adiciona keyframes para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        from {
            transform: translateY(0) rotate(0deg);
        }
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 