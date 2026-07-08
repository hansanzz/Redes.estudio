/* ==========================================================================
   REDES.ESTUDIO — JAVASCRIPT PRINCIPAL
   Este archivo se comparte entre las 5 páginas del sitio.
   Cada bloque revisa primero si los elementos existen en la página actual
   (por eso las páginas que no tienen, por ejemplo, un acordeón, no rompen).
   ========================================================================== */

/* --------------------------------------------------------------------
   1. MENÚ DE NAVEGACIÓN MOBILE (manipulación del DOM)
   -------------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const abierto = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!abierto));
    navMenu.classList.toggle('is-open');
  });

  // Si el usuario hace clic en un link del menú mobile, lo cerramos
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------
   2. RELOJ EN VIVO Y DATOS DEL NAVEGADOR (uso del BOM: Date, navigator)
   -------------------------------------------------------------------- */
const relojSpan = document.getElementById('reloj');
const navegadorSpan = document.getElementById('navegadorInfo');

function actualizarReloj() {
  if (!relojSpan) return;
  const ahora = new Date(); // objeto Date del BOM
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  relojSpan.textContent = `${horas}:${minutos}:${segundos}`;
}

if (relojSpan) {
  actualizarReloj();
  setInterval(actualizarReloj, 1000); // se actualiza cada segundo
}

if (navegadorSpan) {
  // navigator.userAgent es parte del BOM: info del navegador del usuario
  const ua = navigator.userAgent;
  let nombreNavegador = 'Desconocido';
  if (ua.includes('Firefox')) nombreNavegador = 'Firefox';
  else if (ua.includes('Edg')) nombreNavegador = 'Microsoft Edge';
  else if (ua.includes('Chrome')) nombreNavegador = 'Chrome';
  else if (ua.includes('Safari')) nombreNavegador = 'Safari';
  navegadorSpan.textContent = `${nombreNavegador} · ${navigator.language}`;
}

/* --------------------------------------------------------------------
   3. BOTÓN "VOLVER ARRIBA" (BOM: window.scrollTo + eventos de scroll)
   -------------------------------------------------------------------- */
const btnVolverArriba = document.getElementById('btnVolverArriba');

if (btnVolverArriba) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnVolverArriba.classList.add('is-visible');
    } else {
      btnVolverArriba.classList.remove('is-visible');
    }
  });

  btnVolverArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // método del objeto window (BOM)
  });
}

/* --------------------------------------------------------------------
   4. ANIMACIÓN DE APARICIÓN AL HACER SCROLL (IntersectionObserver)
   -------------------------------------------------------------------- */
const elementosReveal = document.querySelectorAll('.reveal');

if (elementosReveal.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target); // ya se mostró, dejamos de observarlo
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosReveal.forEach((el) => observer.observe(el));
} else {
  // Si el navegador no soporta IntersectionObserver, mostramos todo directo
  elementosReveal.forEach((el) => el.classList.add('is-visible'));
}

/* --------------------------------------------------------------------
   5. ACORDEONES (mostrar/ocultar información + manipulación del DOM)
   Se usa en topologías, modelo OSI y modelo TCP/IP.
   -------------------------------------------------------------------- */
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const panel = header.nextElementSibling;
    const estaAbierto = header.getAttribute('aria-expanded') === 'true';

    // Cerramos el panel actual o lo abrimos
    header.setAttribute('aria-expanded', String(!estaAbierto));

    if (estaAbierto) {
      panel.style.maxHeight = null;
      panel.classList.remove('is-open');
    } else {
      panel.classList.add('is-open');
      // Calculamos la altura real del contenido para animar el despliegue
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

/* --------------------------------------------------------------------
   6. "¿POR DÓNDE EMPEZAR?" — selector interactivo, solo en index.html
   -------------------------------------------------------------------- */
const startPicker = document.querySelector('.start-picker');

if (startPicker) {
  const sugerencias = {
    'nunca': 'Empezá por <strong>Topologías</strong>: es la base física de todo lo demás. Seguí con <strong>Modelo OSI</strong> para entender la teoría de capas, después <strong>TCP/IP</strong> para ver el modelo real, y cerrá con <strong>Direccionamiento IP</strong>.',
    'una-vez': 'Repasá primero los dos modelos de capas (<strong>OSI</strong> y <strong>TCP/IP</strong>) comparándolos entre sí, ya que suelen mezclarse en los exámenes. Después reforzá <strong>Direccionamiento IP</strong>, que es la parte más numérica.',
    'repaso-final': 'Enfocate en las tablas y en las secciones interactivas de cada página (el traductor de protocolos, el comparador LAN/WAN/Internet y la calculadora de IP): son un buen resumen rápido de todo el contenido.',
  };

  const botonesNivel = startPicker.querySelectorAll('.pick-btn');
  const startResult = document.getElementById('startResult');

  botonesNivel.forEach((boton) => {
    boton.addEventListener('click', () => {
      botonesNivel.forEach((b) => b.classList.remove('active'));
      boton.classList.add('active');

      const nivel = boton.dataset.nivel;
      startResult.innerHTML = sugerencias[nivel];
      startResult.classList.add('has-result');
    });
  });
}

/* --------------------------------------------------------------------
   6.b "CERRAR TODOS LOS PANELES" del acordeón (usa confirm())
   Puede haber uno de estos botones en más de una página.
   -------------------------------------------------------------------- */
const botonesCerrarTodo = document.querySelectorAll('.btn-cerrar-todo');

botonesCerrarTodo.forEach((btnCerrarTodo) => {
  btnCerrarTodo.addEventListener('click', () => {
    const acordeon = document.getElementById(btnCerrarTodo.dataset.accordion);
    const panelesAbiertos = acordeon.querySelectorAll('.accordion-header[aria-expanded="true"]');

    if (panelesAbiertos.length === 0) {
      alert('No hay ningún panel abierto en este momento.');
      return;
    }

    // confirm(): confirma antes de cerrar todo lo que el usuario tenía desplegado
    const confirmar = confirm(`Tenés ${panelesAbiertos.length} panel(es) abierto(s). ¿Querés cerrarlos todos?`);
    if (!confirmar) return;

    panelesAbiertos.forEach((header) => {
      header.setAttribute('aria-expanded', 'false');
      const panel = header.nextElementSibling;
      panel.style.maxHeight = null;
      panel.classList.remove('is-open');
    });
  });
});

/* --------------------------------------------------------------------
   7. COMPARADOR LAN / WAN / INTERNET — solo en topologias.html
   -------------------------------------------------------------------- */
const comparatorButtons = document.querySelectorAll('.comp-btn');

if (comparatorButtons.length > 0) {
  const datosRedes = {
    lan: {
      titulo: 'LAN — Red de Área Local',
      distancia: 'Menos de 1 km',
      cobertura: 'Habitaciones, un edificio, o algunos edificios cercanos',
    },
    wan: {
      titulo: 'WAN — Red de Área Amplia',
      distancia: 'De 100 km a 1000 km',
      cobertura: 'Un país o un continente',
    },
    internet: {
      titulo: 'Internet',
      distancia: 'Más de 10.000 km',
      cobertura: 'Todo el planeta',
    },
  };

  const compTitulo = document.getElementById('compTitulo');
  const compDistancia = document.getElementById('compDistancia');
  const compCobertura = document.getElementById('compCobertura');

  comparatorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      comparatorButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const clave = btn.dataset.red;
      const datos = datosRedes[clave];
      compTitulo.textContent = datos.titulo;
      compDistancia.textContent = datos.distancia;
      compCobertura.textContent = datos.cobertura;
    });
  });
}

/* --------------------------------------------------------------------
   8. TRADUCTOR DE PROTOCOLOS (a qué capa OSI pertenece) — modelo-osi.html
   -------------------------------------------------------------------- */
const selectProtocolo = document.getElementById('selectProtocolo');

if (selectProtocolo) {
  const capaPorProtocolo = {
    HTTP: 'Aplicación (capa 7)',
    FTP: 'Aplicación (capa 7)',
    SMTP: 'Aplicación (capa 7)',
    POP: 'Aplicación (capa 7)',
    IMAP: 'Aplicación (capa 7)',
    TELNET: 'Aplicación (capa 7)',
    SNMP: 'Aplicación (capa 7)',
    TCP: 'Transporte (capa 4)',
    UDP: 'Transporte (capa 4)',
  };

  const translatorResult = document.getElementById('translatorResult');

  selectProtocolo.addEventListener('change', () => {
    const valor = selectProtocolo.value;
    if (valor === '') {
      translatorResult.textContent = 'Elegí un protocolo de la lista para ver el resultado acá.';
      translatorResult.classList.remove('has-result');
      return;
    }
    translatorResult.textContent = `${valor} pertenece a la capa de ${capaPorProtocolo[valor]}.`;
    translatorResult.classList.add('has-result');
  });
}

/* --------------------------------------------------------------------
   8.b TRADUCTOR DE DISPOSITIVOS DE RED — introduccion.html
   -------------------------------------------------------------------- */
const selectDispositivo = document.getElementById('selectDispositivo');

if (selectDispositivo) {
  const infoPorDispositivo = {
    Hub: 'No filtra tráfico: reenvía los datos a todos los puertos por igual. Todos los equipos conectados comparten un único dominio de colisión grande.',
    Bridge: 'Filtra tráfico por dirección MAC (capa de Enlace) y rompe los dominios de colisión, separando la red en partes más chicas.',
    Switch: 'Igual que el bridge: filtra por dirección MAC y rompe los dominios de colisión, pero pensado para manejar muchos más puertos y tráfico a la vez.',
    Router: 'Filtra tráfico por dirección IP (capa de Red). Se usa para interconectar redes distintas y para salir a Internet.',
  };

  const dispositivoResult = document.getElementById('dispositivoResult');

  selectDispositivo.addEventListener('change', () => {
    const valor = selectDispositivo.value;
    if (valor === '') {
      dispositivoResult.textContent = 'Elegí un dispositivo de la lista para ver el resultado acá.';
      dispositivoResult.classList.remove('has-result');
      return;
    }
    dispositivoResult.textContent = `${valor}: ${infoPorDispositivo[valor]}`;
    dispositivoResult.classList.add('has-result');
  });
}

/* --------------------------------------------------------------------
   9. JUEGO DE RELACIONAR (elemento ↔ capa TCP/IP) — modelo-tcpip.html
   -------------------------------------------------------------------- */
const matchingGame = document.getElementById('matchingGame');

if (matchingGame) {
  const respuestasCorrectas = {
    puerto: 'transporte',
    mac: 'acceso',
    ip: 'internet',
  };

  let seleccionActual = null; // guarda el botón de la izquierda elegido
  const feedback = document.getElementById('matchingFeedback');

  const itemsIzquierda = matchingGame.querySelectorAll('[data-match]');
  const itemsDerecha = matchingGame.querySelectorAll('[data-target]');

  itemsIzquierda.forEach((item) => {
    item.addEventListener('click', () => {
      itemsIzquierda.forEach((i) => i.classList.remove('selected'));
      item.classList.add('selected');
      seleccionActual = item;
      feedback.textContent = 'Ahora hacé clic en la capa que le corresponde.';
    });
  });

  itemsDerecha.forEach((item) => {
    item.addEventListener('click', () => {
      if (!seleccionActual) {
        feedback.textContent = 'Primero elegí un elemento de la columna izquierda.';
        return;
      }

      const claveIzquierda = seleccionActual.dataset.match;
      const esCorrecto = respuestasCorrectas[claveIzquierda] === item.dataset.target;

      if (esCorrecto) {
        seleccionActual.classList.remove('selected');
        seleccionActual.classList.add('correct');
        item.classList.add('correct');
        feedback.textContent = '¡Correcto! ' + seleccionActual.textContent + ' → ' + item.textContent;
      } else {
        item.classList.add('incorrect');
        feedback.textContent = 'No es esa capa. Probá de nuevo.';
        setTimeout(() => item.classList.remove('incorrect'), 700);
      }

      seleccionActual = null;
    });
  });
}

/* --------------------------------------------------------------------
   10. CALCULADORA DE CLASE DE IP (prompt() + alert() + DOM)
   -------------------------------------------------------------------- */
const btnCalcularIp = document.getElementById('btnCalcularIp');
const btnPromptIp = document.getElementById('btnPromptIp');

/**
 * Recibe un string con una IP (formato x.x.x.x) y devuelve un objeto
 * con la clase (A, B, C, D, E) y una explicación, o null si no es válida.
 */
function calcularClaseIp(ipTexto) {
  const partes = ipTexto.trim().split('.');

  if (partes.length !== 4) return null;

  const bytes = partes.map(Number);
  const esValida = bytes.every((b) => Number.isInteger(b) && b >= 0 && b <= 255);
  if (!esValida) return null;

  const primerByte = bytes[0];
  let clase = '';
  let explicacion = '';

  if (primerByte >= 1 && primerByte <= 126) {
    clase = 'A';
    explicacion = 'El primer byte está entre 1 y 126. Usada por organizaciones enormes con pocas redes y muchísimos hosts.';
  } else if (primerByte >= 128 && primerByte <= 191) {
    clase = 'B';
    explicacion = 'El primer byte está entre 128 y 191. Usada por empresas medianas.';
  } else if (primerByte >= 192 && primerByte <= 223) {
    clase = 'C';
    explicacion = 'El primer byte está entre 192 y 223. Usada por usuarios particulares y redes chicas.';
  } else if (primerByte >= 224 && primerByte <= 239) {
    clase = 'D';
    explicacion = 'El primer byte está entre 224 y 239. Reservada para multicast.';
  } else if (primerByte >= 240 && primerByte <= 255) {
    clase = 'E';
    explicacion = 'El primer byte está entre 240 y 255. Reservada para uso experimental.';
  } else {
    clase = 'especial';
    explicacion = 'Es una dirección reservada (por ejemplo, 127.x.x.x se usa para loopback, la propia máquina).';
  }

  return { clase, explicacion };
}

function mostrarResultadoIp(ipTexto, elementoResultado) {
  const resultado = calcularClaseIp(ipTexto);

  if (!resultado) {
    elementoResultado.textContent = 'Esa no es una dirección IP válida. Usá el formato x.x.x.x con números entre 0 y 255.';
    elementoResultado.classList.add('is-error');
    elementoResultado.classList.remove('has-result');
    return;
  }

  elementoResultado.textContent = `La IP ${ipTexto} es de clase ${resultado.clase}. ${resultado.explicacion}`;
  elementoResultado.classList.add('has-result');
  elementoResultado.classList.remove('is-error');
}

if (btnCalcularIp) {
  const inputIp = document.getElementById('inputIp');
  const ipResult = document.getElementById('ipResult');

  btnCalcularIp.addEventListener('click', () => {
    mostrarResultadoIp(inputIp.value, ipResult);
  });

  // Permite calcular también presionando Enter dentro del input
  inputIp.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      mostrarResultadoIp(inputIp.value, ipResult);
    }
  });
}

if (btnPromptIp) {
  const ipResult = document.getElementById('ipResult');

  btnPromptIp.addEventListener('click', () => {
    // prompt(): pide directamente al usuario que escriba una IP
    const ipIngresada = prompt('Escribí una dirección IP para clasificar (ejemplo: 172.16.0.1):', '192.168.1.1');

    if (ipIngresada === null) return; // el usuario canceló el prompt

    const resultado = calcularClaseIp(ipIngresada);
    if (!resultado) {
      alert('Esa dirección IP no es válida. Probá de nuevo con el formato x.x.x.x');
      return;
    }

    alert(`La IP ${ipIngresada} es de clase ${resultado.clase}.\n${resultado.explicacion}`);
    mostrarResultadoIp(ipIngresada, ipResult); // también lo mostramos en pantalla
  });
}
