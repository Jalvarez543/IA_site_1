// ========
// MÓVILES
// ========

// Menú de hamburguesa para móviles
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// ============================
// CARRUSEL PRINCIPAL (IMÁGENES)
// ============================
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const header = document.getElementById('header');

let index = 0;
const totalSlides = images.length;
const intervalTime = 4000; // 4 segundos
let autoSlide = setInterval(() => moveCarousel(index + 1), intervalTime);

function moveCarousel(newIndex) {
    if (newIndex < 0) {
        index = totalSlides - 1;
    } else if (newIndex >= totalSlides) {
        index = 0;
    } else {
        index = newIndex;
    }

    // Calcula el desplazamiento en función del ancho de la ventana
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    // Actualizar indicadores
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });

    // Reiniciar auto-slide
    clearInterval(autoSlide);
    autoSlide = setInterval(() => moveCarousel(index + 1), intervalTime);
}

// Eventos para las flechas de navegación
prevBtn.addEventListener('click', () => moveCarousel(index - 1));
nextBtn.addEventListener('click', () => moveCarousel(index + 1));

// Eventos para los indicadores (rectángulos)
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => moveCarousel(i));
});

// Efecto de header vidrio al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//bug
setInterval(() => {
    moveCarousel(index + 1);
}, 5000); // Cambia cada 5 segundos

// ============================
// CARRUSEL DE TARJETAS (EVENTOS)
// ============================
const eventTrack = document.querySelector('.event-track');
const eventIndicators = document.querySelectorAll('.event-indicator');

let eventIndex = 0;

eventIndicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        eventIndex = i;
        updateEventCarousel();
    });
});

function updateEventCarousel() {
    // Calcula el desplazamiento en función del ancho de una tarjeta
    const cardWidth = document.querySelector('.event-card').offsetWidth;
    const gap = 35; // El gap entre las tarjetas
    const move = eventIndex * -(cardWidth + gap); // Mueve el carrusel a la posición correcta
    eventTrack.style.transform = `translateX(${move}px)`;

    // Actualizar indicadores
    eventIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === eventIndex);
    });
}

// ========================================
// ZONA DE IMÁGENES CON TEXTO Y FORMULARIO
// ========================================

document.querySelector('.contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático

    let consulta = document.querySelector('input[name="consulta"]:checked');
    let nombre = document.querySelector('input[name="nombre"]').value.trim();
    let apellido = document.querySelector('input[name="apellido"]').value.trim();
    let correo = document.querySelector('input[name="correo"]').value.trim();
    let mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

    if (!consulta) {
        alert("Por favor, selecciona el tipo de consulta.");
        return;
    }

    if (nombre === "" || apellido === "" || correo === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    alert("Formulario enviado con éxito.");
    document.querySelector('.contact-form').reset(); // Limpia el formulario
});

//Scroll fluido

document.getElementById('scroll-btn').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#formulario').scrollIntoView({
        behavior: 'smooth'
    });
});