/* Car.js - Carrito con confirmación en sección (sin alert) */
let cart = [];

// Mostrar/ocultar panel
function toggleCart() {
    const panel = document.getElementById("cart-panel");
    panel.style.right = panel.style.right === "0px" ? "-350px" : "0px";
}

function closeCart() {
    const panel = document.getElementById("cart-panel");
    if (panel) panel.style.right = "-350px";
}

// Agregar ítem
function addToCart(name, price) {
    const item = cart.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();

    // abrir carrito automáticamente
    const panel = document.getElementById("cart-panel");
    if (panel) panel.style.right = "0px";
}

// Actualizar vista
function updateCart() {
    const itemsList = document.getElementById("cart-items");
    const totalText = document.getElementById("cart-total");
    const countText = document.getElementById("cart-count");
    const payButton = document.getElementById("btn-pay");

    if (!itemsList || !totalText) return;

    itemsList.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        count += product.quantity;

        itemsList.innerHTML += `
            <li class="cart-item-row" style="display:flex; justify-content:space-between; align-items:center; gap:10px; background:#fff; padding:8px; border-radius:6px; margin-bottom:8px;">
                <div style="flex:1;">
                    <div style="font-weight:600;">${product.name}</div>
                    <div style="font-size:0.9em; color:#555;">S/ ${product.price} x ${product.quantity}</div>
                </div>
                <div style="min-width:48px; text-align:right;">
                    <button class="x-btn" onclick="removeItem(${index})" style="background:#e74c3c; color:#fff; border:none; padding:8px 10px; border-radius:6px; cursor:pointer;">X</button>
                </div>
            </li>
        `;
    });

    totalText.textContent = total.toFixed(2);
    if (countText) countText.textContent = count;

    if (payButton) {
        payButton.disabled = (cart.length === 0);
        payButton.style.opacity = payButton.disabled ? "0.6" : "1";
        payButton.style.cursor = payButton.disabled ? "not-allowed" : "pointer";
    }
}

// Quitar producto
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Vaciar carrito
function clearCart() {
    cart = [];
    updateCart();
    closeCart();

    // Opcional: limpiar mensaje de pago
    const paymentSection = document.getElementById("payment-section");
    const paymentMessage = document.getElementById("payment-message");
    if (paymentMessage) paymentMessage.innerHTML = "";
    if (paymentSection) paymentSection.style.display = "none";
}

// Pagar_Mostrar resumen en sección de abajo
function pagar() {
    const paymentSection = document.getElementById("payment-section");
    const paymentMessage = document.getElementById("payment-message");
    const totalText = document.getElementById("cart-total");

    if (!paymentSection || !paymentMessage || !totalText) {
        console.warn("Elementos de pago no encontrados en el DOM.");
        return;
    }

    // Si carrito vacío, mostramos mensaje informativo en la sección (sin alert)
    if (cart.length === 0) {
        paymentMessage.innerHTML = `
            <h3 style="margin:0 0 8px 0; color:#1b5e20;">Carrito vacío</h3>
            <p style="margin:0;color:#444;">No hay productos seleccionados. Agrega productos al carrito para poder realizar el pago.</p>
        `;
        paymentSection.style.display = "block";
        return;
    }

    // Construir resumen de compra
    let html = `<h3 style="margin:0 0 8px 0; color:#1b5e20;">Resumen de tu compra</h3>`;
    html += `<ul style="list-style:none; padding:0; margin:8px 0 12px 0;">`;

    cart.forEach(prod => {
        html += `<li style="padding:6px 0; border-bottom:1px solid #eee;"><strong>${prod.name}</strong> — S/ ${prod.price} × ${prod.quantity} = S/ ${(prod.price * prod.quantity).toFixed(2)}</li>`;
    });

    html += `</ul>`;
    html += `<p style="font-weight:700; margin:10px 0;">Total a pagar: S/ ${totalText.textContent}</p>`;

    // Mensaje de éxito (no alert)
    html += `<p style="margin-top:6px; color:#2e7d32;">Tu pedido ha sido registrado. Nos pondremos en contacto para coordinar el pago/retirada.</p>`;

    // Mostrar en la sección
    paymentMessage.innerHTML = html;
    paymentSection.style.display = "block";

    // Aquí simularíamos finalizar la compra: vaciar carrito (si quieres mantener historial, cambia esto)
    cart = [];
    updateCart();
}



// ================================
// BUSCADOR DE SEMILLAS
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscar");
    const productos = document.querySelectorAll(".catalogo .item");

    buscador.addEventListener("keyup", () => {
        let texto = buscador.value.toLowerCase().trim();

        productos.forEach(item => {
            let nombre = item.querySelector("p strong").textContent.toLowerCase();

            if (nombre.includes(texto)) {
                item.style.display = "flex"; // visible
            } else {
                item.style.display = "none"; // oculto
            }
        });
    });
});
