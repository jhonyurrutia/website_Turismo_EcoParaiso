/*  - JavaScript Principal */

'use strict';

//  DOMContentLoaded 
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initAñoFooter();
  initScrollTop();
  initHeroParallax();
  initGaleria();
  initHabitacionesFiltros();
});


/*    NAVBAR  */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const links = document.querySelector('.navbar__links');

  if (!navbar) return;

  // Scroll effect
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  
// Hamburger
  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('abierto');
      links.classList.toggle('abierto');
      hamburger.setAttribute('aria-expanded', links.classList.contains('abierto'));
    });

    // Cerrar al hacer clic en enlace
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('abierto');
        links.classList.remove('abierto');
      });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('abierto');
        links.classList.remove('abierto');
      }
    });
  }

  // Enlace activo según página actual
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      a.classList.add('activo');
    }
  });
}

/*   ANIMACIONES SCROLL (Intersection Observer)  */
function initScrollAnimations() {
  const opciones = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Delay escalonado para grupos de cards
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, opciones);

  // Agregar delay escalonado a grupos de cards
  document.querySelectorAll('.servicio-card, .habitacion-card, .testimonio-card, .valor-card').forEach((card, i) => {
    card.dataset.delay = (i % 3) * 120;
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/*    AÑO AUTOMÁTICO  */
function initAñoFooter() {
  const spans = document.querySelectorAll('.anio-actual');
  spans.forEach(span => {
    span.textContent = new Date().getFullYear();
  });
}


/*    SCROLL TO TOP */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/*    PARALLAX HERO   */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.4}px)`;
  }, { passive: true });
}


/*    FILTROS HABITACIONES   */
function initHabitacionesFiltros() {
  const botones = document.querySelectorAll('.filtro-btn');
  const cards   = document.querySelectorAll('.habitacion-card');

  if (!botones.length) return;

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      const filtro = btn.dataset.filtro;

      cards.forEach(card => {
        if (filtro === 'todas' || card.dataset.tipo === filtro) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}



/* CONTADOR ANIMADO */
function animarContadores() {
  document.querySelectorAll('[data-contador]').forEach(el => {
    const objetivo = parseInt(el.dataset.contador);
    const duracion = 2000;
    const inicio = performance.now();

    const paso = (tiempo) => {
      const progreso = Math.min((tiempo - inicio) / duracion, 1);
      const easing = 1 - Math.pow(1 - progreso, 3);
      el.textContent = Math.round(easing * objetivo) + (el.dataset.sufijo || '');
      if (progreso < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}

// Activar contadores cuando sean visibles
document.addEventListener('DOMContentLoaded', () => {
  const contadores = document.querySelectorAll('[data-contador]');
  if (!contadores.length) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      animarContadores();
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  contadores.forEach(c => obs.observe(c));
});

// FORMULARIO RESERVA
const formReserva = document.getElementById('formReserva');

if(formReserva){
formReserva.addEventListener('submit', function(e){
e.preventDefault();

document.getElementById('mensajeReserva').innerHTML =
'✅ Reservación enviada correctamente.';

formReserva.reset();
});
}


// EFECTO DE GALERÍA

const imagenesGaleria = document.querySelectorAll('.galeria-item img');

imagenesGaleria.forEach(imagen => {

imagen.addEventListener('click', () => {

const ventana = window.open('');

ventana.document.write(`
    <img 
        src="${imagen.src}" 
        style="
        width:100%;
        height:100vh;
        object-fit:cover;
        margin:0;
        ">
`);

});

});