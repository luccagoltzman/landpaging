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

    /**
     * Efeito 3D: inclina elemento em vários ângulos conforme a posição do cursor.
     * @param {HTMLElement} el - Elemento (hero ou card)
     * @param {Object} opts - { maxRotate, perspective, liftY, liftZ, scale }
     */
    function apply3DTilt(el, opts) {
        var maxRotate = opts.maxRotate !== undefined ? opts.maxRotate : 20;
        var perspective = opts.perspective !== undefined ? opts.perspective : 1000;
        var liftY = opts.liftY !== undefined ? opts.liftY : 0;
        var liftZ = opts.liftZ !== undefined ? opts.liftZ : 0;
        var scale = opts.scale !== undefined ? opts.scale : 1;

        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var w = rect.width;
            var h = rect.height;
            var x = (e.clientX - rect.left) / w;
            var y = (e.clientY - rect.top) / h;
            // Posição normalizada -0.5 a 0.5 (centro = 0)
            var nx = x - 0.5;
            var ny = y - 0.5;
            // Rotação: cursor à direita → card inclina para direita (rotateY +)
            var rotateY = nx * maxRotate * 2;
            var rotateX = -ny * maxRotate * 2;
            // Leve "elevação" no eixo Z conforme o cursor (centro = mais perto)
            var distFromCenter = Math.sqrt(nx * nx + ny * ny) * 2;
            var z = (1 - Math.min(distFromCenter, 1)) * liftZ;
            var parts = ['perspective(' + perspective + 'px)'];
            if (scale !== 1) parts.push('scale(' + scale + ')');
            if (liftY !== 0) parts.push('translateY(' + liftY + 'px)');
            if (z > 0) parts.push('translateZ(' + z + 'px)');
            parts.push('rotateX(' + rotateX + 'deg)');
            parts.push('rotateY(' + rotateY + 'deg)');
            el.style.transform = parts.join(' ');
        });

        el.addEventListener('mouseleave', function () {
            el.style.transform = '';
        });
    }

    // --- Efeito 3D na imagem do hero (ângulos e perspectiva seguem o cursor) ---
    function init3DTiltHero() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var hero = document.querySelector('.hero-image');
        if (!hero) return;

        apply3DTilt(hero, {
            maxRotate: 22,
            perspective: 1000,
            liftY: 0,
            liftZ: 18,
            scale: 1.02
        });
    }

    // --- Efeito 3D nos cards (mesmo efeito da imagem: ângulos e perspectiva seguem o cursor) ---
    function init3DTiltCards() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var cards = document.querySelectorAll('.card');

        cards.forEach(function (card) {
            apply3DTilt(card, {
                maxRotate: 22,
                perspective: 1000,
                liftY: -8,
                liftZ: 20,
                scale: 1
            });
        });
    }

    // --- Inicialização ao carregar a página ---
    function init() {
        initScrollAnimations();
        initParallaxCircle();
        initButtonFeedback();
        initCardClick();
        initHeroImageClick();
        init3DTiltHero();
        init3DTiltCards();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
