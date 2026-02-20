/**
 * Interações — Território 2030
 * Animações de entrada, parallax, hover e clique
 */

(function () {
    'use strict';

    // --- Animações ao entrar na viewport (Intersection Observer) ---
    function initScrollAnimations() {
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            document.querySelectorAll('.content, .hero-image, .cards, .card').forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        var content = document.querySelector('.content');
        var heroImage = document.querySelector('.hero-image');
        var cards = document.querySelector('.cards');
        var cardItems = document.querySelectorAll('.card');

        if (content) observer.observe(content);
        if (heroImage) observer.observe(heroImage);
        if (cards) observer.observe(cards);
        cardItems.forEach(function (card) {
            observer.observe(card);
        });
    }

    // --- Parallax suave no círculo amarelo (movimento do mouse) ---
    function initParallaxCircle() {
        var circle = document.querySelector('.circle-bg');
        if (!circle) return;

        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 12;
            var y = (e.clientY / window.innerHeight - 0.5) * 12;
            circle.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
    }

    // --- Botão "Get started": feedback de clique ---
    function initButtonFeedback() {
        var btn = document.querySelector('.btn-primary');
        if (!btn) return;

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            btn.classList.add('btn-clicked');
            setTimeout(function () {
                btn.classList.remove('btn-clicked');
            }, 300);
        });
    }

    // --- Cards: feedback de clique (opcional) ---
    function initCardClick() {
        document.querySelectorAll('.card').forEach(function (card) {
            card.addEventListener('click', function () {
                card.classList.add('card-clicked');
                setTimeout(function () {
                    card.classList.remove('card-clicked');
                }, 400);
            });
        });
    }

    // --- Hero image: clique abre em nova aba (opcional) ou só hover ---
    function initHeroImageClick() {
        var hero = document.querySelector('.hero-image');
        if (!hero) return;
        hero.setAttribute('role', 'button');
        hero.setAttribute('tabindex', '0');
        hero.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hero.click();
            }
        });
    }

    // --- Inicialização ao carregar a página ---
    function init() {
        initScrollAnimations();
        initParallaxCircle();
        initButtonFeedback();
        initCardClick();
        initHeroImageClick();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
