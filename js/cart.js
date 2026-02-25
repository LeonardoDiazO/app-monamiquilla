// =============================================
// CARRITO DE COMPRAS - Mon Ami Quilla
// =============================================

import { getProductById, formatPrice } from './products.js';

const WHATSAPP_NUMBER = '573504974950'; // +57 3504974950

class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.isOpen = false;
        this.init();
    }

    init() {
        this.updateBadge();
        this.bindEvents();
    }

    bindEvents() {
        // Toggle del carrito
        const cartBtn = document.getElementById('cart-btn');
        const cartClose = document.getElementById('cart-close');
        const cartOverlay = document.getElementById('cart-overlay');

        if (cartBtn) cartBtn.addEventListener('click', () => this.open());
        if (cartClose) cartClose.addEventListener('click', () => this.close());
        if (cartOverlay) cartOverlay.addEventListener('click', () => this.close());

        // Botón de WhatsApp
        const whatsappBtn = document.getElementById('whatsapp-order-btn');
        if (whatsappBtn) whatsappBtn.addEventListener('click', () => this.sendWhatsApp());
    }

    // Agregar producto al carrito
    add(productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) return;

        const existing = this.items.find(i => i.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ id: productId, quantity });
        }

        this.save();
        this.updateBadge();
        this.renderCartItems();
        this.showAddedFeedback(product.name);
    }

    // Eliminar producto
    remove(productId) {
        this.items = this.items.filter(i => i.id !== productId);
        this.save();
        this.updateBadge();
        this.renderCartItems();
    }

    // Cambiar cantidad
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.remove(productId);
            return;
        }
        const item = this.items.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            this.save();
            this.updateBadge();
            this.renderCartItems();
        }
    }

    // Vaciar carrito
    clear() {
        this.items = [];
        this.save();
        this.updateBadge();
        this.renderCartItems();
    }

    // Total del carrito
    getTotal() {
        return this.items.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // Cantidad total de items
    getCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Persistencia en localStorage
    save() {
        localStorage.setItem('monami_cart', JSON.stringify(this.items));
    }

    loadFromStorage() {
        try {
            return JSON.parse(localStorage.getItem('monami_cart')) || [];
        } catch {
            return [];
        }
    }

    // UI: Abrir/cerrar carrito
    open() {
        this.isOpen = true;
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCartItems();
    }

    close() {
        this.isOpen = false;
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // UI: Actualizar badge
    updateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.getCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        });
    }

    // UI: Renderizar items del carrito
    renderCartItems() {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        const emptyMsg = document.getElementById('cart-empty');
        const cartFooter = document.getElementById('cart-footer');

        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = '';
            if (emptyMsg) emptyMsg.classList.remove('hidden');
            if (cartFooter) cartFooter.classList.add('hidden');
            return;
        }

        if (emptyMsg) emptyMsg.classList.add('hidden');
        if (cartFooter) cartFooter.classList.remove('hidden');

        container.innerHTML = this.items.map(item => {
            const product = getProductById(item.id);
            if (!product) return '';
            return `
        <div class="cart-item" data-id="${product.id}">
          <div class="cart-item-img" style="background: ${product.gradient}">
            <span>${product.emoji}</span>
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-name">${product.name}</h4>
            <span class="cart-item-category">${product.categoryLabel}</span>
            <div class="cart-item-controls">
              <div class="qty-control">
                <button class="qty-btn" onclick="cart.updateQuantity(${product.id}, ${item.quantity - 1})">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="cart.updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
              </div>
              <span class="cart-item-price">${formatPrice(product.price * item.quantity)}</span>
            </div>
          </div>
          <button class="cart-item-remove" onclick="cart.remove(${product.id})" title="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
      `;
        }).join('');

        if (totalEl) totalEl.textContent = formatPrice(this.getTotal());
    }

    // Feedback visual al agregar al carrito
    showAddedFeedback(productName) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = `✅ "${productName}" agregado al carrito`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
        this.open();
    }

    // Generar mensaje de WhatsApp con el pedido
    sendWhatsApp() {
        if (this.items.length === 0) {
            alert('Tu carrito está vacío 🛒');
            return;
        }

        let message = '¡Hola Mon Ami! 😊 Quiero hacer el siguiente pedido:\n\n';

        this.items.forEach(item => {
            const product = getProductById(item.id);
            if (product) {
                message += `• ${product.name} (${product.categoryLabel}) x${item.quantity} = ${formatPrice(product.price * item.quantity)}\n`;
            }
        });

        message += `\n*Total estimado: ${formatPrice(this.getTotal())}*`;
        message += '\n\n¿Está disponible? ¿Cuáles son los tiempos de entrega? 🎨';

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
}

// Instancia global del carrito
const cart = new Cart();

// Exponer globalmente para los botones inline del HTML
window.cart = cart;

export default cart;
