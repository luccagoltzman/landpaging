# Lucca Goltzman — Portfólio Web Design

Landing page em tema escuro para demonstração de conhecimentos em **web design**: layout baseado em Figma, HTML semântico, CSS moderno e interações em JavaScript puro.

## Sobre o projeto

- **Objetivo:** Portfólio para GitHub mostrando habilidades em UI/UX, layout responsivo, HTML, CSS e JavaScript.
- **Design:** Baseado no arquivo Figma
- **Stack:** Apenas HTML, CSS e JavaScript; sem frameworks nem dependências externas além do Google Fonts (Bitter).

## Funcionalidades

- **Layout fiel ao Figma:** Hero com título, subtítulo e CTA; imagem em destaque com stats (50+, 100%); quatro cards de habilidades (UI & UX, Layout responsivo, HTML/CSS/JS, Performance).
- **Efeito 3D (hover):** Imagem do hero e cards inclinam em diferentes ângulos conforme a posição do mouse (rotateX/rotateY + translateZ), com perspectiva e sensação de profundidade.
- **Animações de entrada:** Conteúdo, imagem e cards ganham animação ao entrar na viewport (Intersection Observer).
- **Parallax no círculo:** Elemento decorativo amarelo (circle-bg) desloca-se levemente com o movimento do mouse.
- **Interações:** Hover e clique no botão e nos cards; transições suaves; respeito a `prefers-reduced-motion`.
- **Responsivo:** Ajustes para tablet e mobile (layout empilhado, elementos reposicionados).

## Estrutura do projeto

```
landpaging/
├── index.html          # Página única (hero, stats, cards)
├── styles/
│   └── main.css        # Estilos, variáveis, responsivo e efeitos 3D
├── scripts/
│   └── main.js         # Animações, parallax, tilt 3D, feedback de clique
├── assets/
│   ├── circle-bg.svg   # Círculo amarelo com blur (Figma)
│   ├── card-icon.svg   # Ícone estrela dos cards (Figma)
│   └── images/
│       ├── unsplash_fn--TuQvBZ0.png   # Imagem do hero (cenário espacial)
│       └── hero/       # Pasta para imagens do hero (ex.: imgHero.svg)
└── README.md
```

## Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/luccagoltzman/landpaging.git
   cd landpaging
   ```

2. Abra o `index.html` no navegador ou use um servidor local (ex.: extensão Live Server no VS Code).

Não há build nem instalação de dependências.

## Tecnologias e técnicas

| Área        | Detalhes |
|------------|----------|
| **HTML**   | Semântico, acessível (alt, roles, focus), meta description |
| **CSS**    | Variáveis (`--bg`, `--text`), Flexbox/Grid, `perspective` e `transform-style: preserve-3d`, media queries, `prefers-reduced-motion` |
| **JS**     | Vanilla JS: Intersection Observer, `mousemove`/`mouseleave` para 3D tilt, feedback de clique |

## Personalização

- **Cores:** Variáveis no início de `styles/main.css` (`:root`).
- **Textos:** Edite diretamente no `index.html` (título, subtítulo, stats, títulos e descrições dos cards).
- **Imagem do hero:** Substitua `assets/images/unsplash_fn--TuQvBZ0.png` ou altere o `src` no HTML.

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge).
- Layout e interações testados em desktop; responsivo para tablets e celulares.
- Efeitos 3D desativados automaticamente quando o usuário preferir menos movimento (`prefers-reduced-motion: reduce`).

## Licença

Este projeto está sob a licença MIT.

---

*Projeto de portfólio para demonstração de conhecimentos em web design.*
