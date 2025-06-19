// Animação de elementos ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    // Configuração do Intersection Observer para animações de entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que devem ser animados
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Adicionar classe 'animate' quando o elemento é visível
    document.addEventListener('scroll', () => {
        animateElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    });
});

// Função auxiliar para verificar se um elemento está visível na viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Efeito Parallax
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        const scrolled = window.pageYOffset;
        parallax.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Animação suave do header ao rolar
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Rolando para baixo
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Rolando para cima
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Adicionar classe 'animate' aos elementos quando visíveis
document.querySelectorAll('.feature-card, .testimonial-card').forEach(element => {
    element.classList.add('animate');
});

// Estilização dinâmica para elementos animados
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }

        .scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }
    </style>
`); 