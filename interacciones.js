// CARRUSELETE GRANDE
const banners = document.querySelectorAll(".banner");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
let bannerActual = 0;

// esto es para mostrar el banner
function mostrarBanner(numero) {
    banners.forEach(function(banner) {
        banner.classList.remove("activo");
    });
    banners[numero].classList.add("activo");
}

// esto hace que al hacer el click pase a la imagen siguiente
// el IF es el SI TOCA EL BOTON, HACER >0 OSEA PASAR AL SIGUIENTE
botonSiguiente.addEventListener("click", function() {
    bannerActual++;
    if (bannerActual >= banners.length) {
        bannerActual = 0;
    }
    mostrarBanner(bannerActual);
});

// esto hace que al hacer el click vuelva a la imagen anterior
// el IF es el SI TOCA EL BOTON, HACER <0 -1 OSEA VOLVER AL ANTERIOR
botonAnterior.addEventListener("click", function() {
    bannerActual--;
    if (bannerActual < 0) {
        bannerActual = banners.length - 1;
    }
    mostrarBanner(bannerActual);
});


//CARRUSEL DE TARJETAS

const pistaPreestrenos = document.getElementById("preestrenos-pista");
if (pistaPreestrenos) {
    // Buscar las películas de cartelera asi no enemos que hacerlas de nuevo
    const peliculasOriginales = document.querySelectorAll(
        "#cartelera > .peliculas > .pelicula"
    );
    // Crear copias de las tarjetas para que no sea un choclazo el html
    peliculasOriginales.forEach((pelicula) => {
        const copia = pelicula.cloneNode(true);
        // Eliminar ventanas emergentes para evitar IDs duplicados
        copia.querySelectorAll(".modal-pelicula").forEach(modal => {
            modal.remove();
        });
        // Reemplazar botón por enlace
        const boton = copia.querySelector(".btn-horarios");
        if (boton) {
            const enlace = document.createElement("a");
            enlace.href = "horarios.html";
            enlace.className = "btn-horarios";
            enlace.textContent = "VER HORARIOS";
            boton.replaceWith(enlace);
        }
        pistaPreestrenos.appendChild(copia);
    });
    const tarjetas = pistaPreestrenos.querySelectorAll(".pelicula");
    let posicion = 0;
    const visibles = 4;
    const totalPosiciones = Math.max(1, tarjetas.length - visibles + 1);
    function actualizarPreestrenos() {
        const anchoTarjeta = tarjetas[0].getBoundingClientRect().width;
        const espacio = 18;
        pistaPreestrenos.style.transform =
            `translateX(-${posicion * (anchoTarjeta + espacio)}px)`;
    }
    document.getElementById("preestrenos-anterior").addEventListener("click", () => {
        posicion = posicion > 0 ? posicion - 1 : totalPosiciones - 1;
        actualizarPreestrenos();
    });
    document.getElementById("preestrenos-siguiente").addEventListener("click", () => {
        posicion = posicion < totalPosiciones - 1 ? posicion + 1 : 0;
        actualizarPreestrenos();
    });
    window.addEventListener("resize", actualizarPreestrenos);
    actualizarPreestrenos();
}

// PANTALLA DE CARGA PARA LOS BOTONES VER HORARIOS

const pantallaCarga = document.getElementById("pantallaCarga");
const botonesHorarios = document.querySelectorAll(".btn-horarios");

botonesHorarios.forEach(function(boton) {
    boton.addEventListener("click", function(event) {
        // Si es un botón que abre un modal
        if (boton.tagName === "BUTTON") {
            const idModal = boton.getAttribute("popovertarget");
            const modal = document.getElementById(idModal);
            // Si no encuentra el modal, no ejecuta la animación
            if (!modal) return;
            event.preventDefault();
            pantallaCarga.classList.add("activa");
            setTimeout(function() {
                pantallaCarga.classList.remove("activa");
                modal.showPopover();
            }, 2000);
        }
        // Si es un enlace que lleva a horarios.html
        else if (boton.tagName === "A") {
            const destino = boton.getAttribute("href");
            if (!destino) return;
            event.preventDefault();
            pantallaCarga.classList.add("activa");
            setTimeout(function() {
                window.location.href = destino;
            }, 2000);
        }
    });
});
