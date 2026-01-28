document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DETECCIÓN AUTOMÁTICA DE IDIOMA ---
  const autoDetectLanguage = () => {
    // Obtiene el código del navegador (ej: "es-ES" o "en-US")
    const userLang = navigator.language || navigator.userLanguage;
    
    // Si el idioma empieza por "es", ponemos español, de lo contrario inglés
    if (userLang.startsWith('es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  };

  // --- 2. OBSERVADOR PARA EFECTOS DE SCROLL (FADE IN) ---
  const elements = document.querySelectorAll(".scroll-fade");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );
  elements.forEach((el) => observer.observe(el));

  // --- 3. EFECTO MATRIX (OPTIMIZADO) ---
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let columns, drops;
    const fontSize = 16;
    const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrixChars = letters.split("");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      // Ajustamos al alto del header para que no ocupe toda la web innecesariamente
      canvas.height = document.querySelector("header").offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#ff7e00"; // Tu color naranja
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      // requestAnimationFrame es mejor para el rendimiento que setInterval
      requestAnimationFrame(drawMatrix);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawMatrix();
  }

  // Ejecutar detección de idioma al cargar
  autoDetectLanguage();
});

// --- 4. FUNCIÓN CAMBIO DE IDIOMA ---
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-en]");
  elements.forEach(el => {
    const translation = el.getAttribute(`data-${lang}`);
    if (translation) {
      el.innerText = translation;
    }
  });

  // OPCIONAL: Reiniciar la animación del nombre al cambiar idioma
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
      typewriter.style.animation = 'none';
      typewriter.offsetHeight; // Truco para forzar el reflow
      typewriter.style.animation = null;
  }
}

// Añade esto dentro de tu función setLanguage(lang) actual
const cvBtn = document.querySelector('.btn-cv');
if (cvBtn) {
    // Si tienes archivos diferentes: docs/cv_es.pdf y docs/cv_en.pdf
    cvBtn.setAttribute('href', `docs/CV_Hilan_${lang}.pdf`);
}