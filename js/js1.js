/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* ============================================
   TESTIMONIOS – JGE AGRO
   Arreglos 1D, 2D, ciclos, condicionales, DOM
============================================ */

// --------------
// ARREGLO 2D – Testimonios predeterminados
// [nombre, texto, estrellas, imagen]
// --------------

let testimonios = [
    ["María López", "Los productos son de excelente calidad. Muy recomendados.", 5, "imagenes/p1.png"],
    ["Carlos Díaz", "Buena atención y entrega rápida. Seguiré comprando.", 4, "imagenes/p2.png"],
    ["Ana Torres", "Los abonos mejoraron mis cultivos bastante.", 5, "imagenes/p3.png"]
];

// --------------
// Mostrar testimonios en pantalla (DOM)
// --------------

function mostrarTestimonios() {
    const contenedor = document.getElementById("contenedor-testimonios");
    contenedor.innerHTML = ""; // limpiar antes de dibujar

    testimonios.forEach(function(t) {
        // Crear tarjeta
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("testimonio-card");

        // Plantilla
        tarjeta.innerHTML = `
            <img src="${t[3]}" class="testimonio-img" alt="Cliente">
            <div class="testimonio-nombre">${t[0]}</div>
            <div class="testimonio-texto">${t[1]}</div>
            <div class="estrellas">${"★".repeat(t[2])}</div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// Llamada inicial
mostrarTestimonios();


// ============================================
// FUNCIÓN: Agregar testimonio con prompt
// ============================================

function agregarTestimonio() {
    alert("Vas a agregar un nuevo testimonio.");

    let nombre = prompt("Ingresa el nombre del cliente:");
    if (!nombre) {
        alert("El nombre no puede estar vacío.");
        return;
    }

    let texto = prompt("Escribe el testimonio:");
    if (!texto) {
        alert("El testimonio no puede estar vacío.");
        return;
    }

    // ------------------------
    // Estrellas usando SWITCH
    // ------------------------
    let estrellas = prompt("Calificación del 1 al 5:");
    estrellas = parseInt(estrellas);

    switch (estrellas) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            alert("Valor inválido. Se asignó 3 estrellas por defecto.");
            estrellas = 3;
    }

    // ================================
    // FOTO POR DEFECTO AUTOMÁTICA
    // ================================
    // Antes era: let img = "imagenes/user_default.jpg";
    // Ahora será SIEMPRE una imagen por defecto
    let img = "imagenes/p4.png";  // ← AQUÍ VA TU FOTO POR DEFECTO

    const confirmar = confirm("¿Deseas guardar este testimonio?");

    if (confirmar) {
        testimonios.push([nombre, texto, estrellas, img]);
        alert("Testimonio guardado correctamente.");
        mostrarTestimonios();
    } else {
        alert("Se canceló.");
    }
}


// ============================================
// EXTRA – FILTRAR POR ESTRELLAS (ARREGLO 1D)
// ============================================

function filtrarEstrellas() {
    let min = prompt("¿Mostrar testimonios con cuántas estrellas mínimo? (1-5)");
    min = parseInt(min);

    if (min < 1 || min > 5) {
        alert("Valor inválido.");
        return;
    }

    let resultado = []; // ← ARREGLO 1D nuevo

    // WHILE para cumplir con el requisito
    let i = 0;
    while (i < testimonios.length) {
        if (testimonios[i][2] >= min) {
            resultado.push(testimonios[i]);
        }
        i++;
    }

    if (resultado.length === 0) {
        alert("No hay testimonios con ese mínimo.");
        return;
    }

    // Limpiar contenedor
    const contenedor = document.getElementById("contenedor-testimonios");
    contenedor.innerHTML = "";

    resultado.forEach(t => {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("testimonio-card");

        tarjeta.innerHTML = `
            <img src="${t[3]}" class="testimonio-img">
            <div class="testimonio-nombre">${t[0]}</div>
            <div class="testimonio-texto">${t[1]}</div>
            <div class="estrellas">${"★".repeat(t[2])}</div>
        `;

        contenedor.appendChild(tarjeta);
    });
}
