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

// Cursor Personalizado
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Adiciona classe active quando hover em links e botões
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('active'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// Animações de Scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, .hero-content, .hero-image');
    elements.forEach(element => {
        element.classList.add('scroll-animate');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adiciona classe quando rola mais que 100px
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// Parallax Suave
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.backgroundPositionY = `${yPos}px`;
        });
    });
}

// Efeito de Loading
function initLoadingEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
            });
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hover Effect 3D
function init3DHoverEffect() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTop = document.createElement('div');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '<i class="ph ph-arrow-up"></i>';
    document.body.appendChild(scrollTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icon = type === 'success' ? 'ph-check-circle' : 'ph-warning';
    toast.innerHTML = `
        <i class="ph ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Feature Cards Interaction
function initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            showToast(`Saiba mais sobre: ${title}`);
        });
        
        // Efeito de hover 3D suave
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Loading State
function initLoadingState() {
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.body.appendChild(loadingSpinner);
    
    window.addEventListener('load', () => {
        loadingSpinner.remove();
        document.body.style.opacity = 1;
    });
}

// Smooth Scroll com Offset para o Header
function initSmoothScrollWithOffset() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animação de Entrada nos Elementos
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, .hero-content, .hero-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adiciona delay progressivo para cards
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    elements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Definir opacidade inicial do body
    document.body.style.opacity = 0;
    
    initCustomCursor();
    initProgressBar();
    initScrollToTop();
    initFeatureCards();
    initLoadingState();
    initSmoothScrollWithOffset();
    initScrollAnimations();
    initHeaderScroll();
    initParallax();
});

// Remover loading state e mostrar conteúdo
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = 1;
    
    // Toast de boas-vindas
    setTimeout(() => {
        showToast('Bem-vindo! Explore nosso site.');
    }, 1000);
}); 