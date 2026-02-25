// =============================================
// MAIN.JS – Mon Ami Quilla
// Lógica principal: renderizado, filtros, UI
// =============================================

import { products, getFeaturedProducts, getProductsByCategory, formatPrice, searchProducts } from './products.js';
import cart from './cart.js';

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initParticles();
    initScrollEffects();
    initMobileMenu();

    const isShopPage = document.getElementById('products-grid') !== null;
    const isFeatured = document.getElementById('featured-products') !== null;

    if (isShopPage) {
        initShopPage();
    }
    if (isFeatured) {
        renderFeaturedProducts();
    }
});

// =============================================
// NAVBAR – scroll shadow + active link
// =============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// =============================================
// MENÚ MÓVIL
// =============================================
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        // Animar hamburger
        toggle.classList.toggle('active');
    });

    // Cerrar al hacer click en un link
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
    });
}

// =============================================
// PARTÍCULAS FLOTANTES (Hero)
// =============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const emojis = ['🎨', '✨', '🌟', '🎉', '💐', '🌈', '🎈', '🎁', '☀️', '🌺'];
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#9B5DE5', '#4facfe'];

    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = 6 + Math.random() * 10;
        p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      animation-duration:${8 + Math.random() * 12}s;
      animation-delay:${Math.random() * 8}s;
    `;
        container.appendChild(p);
    }

    // Emojis flotantes
    for (let i = 0; i < 8; i++) {
        const e = document.createElement('div');
        e.className = 'particle';
        e.style.cssText = `
      font-size:${1 + Math.random() * 1.2}rem;
      background:none;
      left:${Math.random() * 100}%;
      animation-duration:${10 + Math.random() * 15}s;
      animation-delay:${Math.random() * 10}s;
      display:flex; align-items:center; justify-content:center;
    `;
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        container.appendChild(e);
    }
}

// =============================================
// ANIMACIONES SCROLL (Intersection Observer)
// =============================================
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// =============================================
// RENDERIZAR TARJETA DE PRODUCTO
// =============================================
function renderProductCard(product) {
    const badgeClass = {
        'Lo más vendido': 'badge-best',
        'Personalizable': 'badge-custom',
        '¡Oferta!': 'badge-sale',
        'Nuevo': 'badge-new',
        'Kit completo': 'badge-custom',
    }[product.badge] || '';

    const oldPrice = product.originalPrice
        ? `<span class="product-price-original">${formatPrice(product.originalPrice)}</span>`
        : '';

    const badge = product.badge
        ? `<span class="product-badge ${badgeClass}">${product.badge}</span>`
        : '';

    return `
    <div class="product-card" data-id="${product.id}" data-cat="${product.category}">
      <div class="product-img" style="background:${product.gradient}">
        ${badge}
        <span style="font-size:4rem; line-height:1;">${product.emoji}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${product.categoryLabel}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price-wrap">
            ${oldPrice}
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="cart.add(${product.id})">
            <i class="fas fa-plus"></i> Agregar
          </button>
        </div>
      </div>
    </div>
  `;
}

// =============================================
// PRODUCTOS DESTACADOS (index.html)
// =============================================
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(renderProductCard).join('');

    // Activar reveal
    initScrollEffects();
}

// =============================================
// PÁGINA TIENDA (shop.html)
// =============================================
function initShopPage() {
    const grid = document.getElementById('products-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const countEl = document.getElementById('results-count');

    let currentCat = 'all';
    let currentQuery = '';

    // Leer categoría de la URL (?cat=icopor)
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get('cat');
    if (urlCat) {
        currentCat = urlCat;
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === urlCat);
        });
    }

    function render() {
        let list = currentQuery.trim().length > 0
            ? searchProducts(currentQuery)
            : getProductsByCategory(currentCat);

        // Si hay búsqueda + cat filtrar también por cat
        if (currentQuery.trim() && currentCat !== 'all') {
            list = list.filter(p => p.category === currentCat);
        }

        if (countEl) {
            countEl.textContent = list.length === 0
                ? 'Sin resultados'
                : `${list.length} producto${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}`;
        }

        if (list.length === 0) {
            grid.innerHTML = `
        <div class="no-results">
          <span>😕</span>
          <p>No encontramos productos con ese criterio.</p>
          <p style="margin-top:0.5rem; font-size:0.82rem;">Intenta con otra categoría o escríbenos por WhatsApp.</p>
        </div>`;
            return;
        }

        grid.innerHTML = list.map(renderProductCard).join('');
    }

    // Eventos de filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCat = btn.dataset.cat;
            currentQuery = '';
            if (searchInput) searchInput.value = '';
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render();
        });
    });

    // Búsqueda (debounce)
    let searchTimer;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                currentQuery = searchInput.value;
                render();
            }, 300);
        });
    }

    // Render inicial
    render();
}

// Exponer helpers globalmente si se necesitan
window.renderProductCard = renderProductCard;
