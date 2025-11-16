import { initRegistro } from './registro.js';
import { initSmart } from './smart.js';
import { initTareas } from './tareas.js';
import { initDatos } from './datos.js';
import { verVideo } from './videos.js';
import { load, save } from './storage.js';

const TESTS_KEY = 'valorant-tests';

const initNavegacion = () => {
  const navButtons = document.querySelectorAll('header nav button');
  const panels = document.querySelectorAll('.panel');

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      panels.forEach((panel) => panel.classList.toggle('active', panel.id === button.dataset.section));
    });
  });

  navButtons[0].classList.add('active');
};

const initVideos = () => {
  document.querySelectorAll('button.video').forEach((button) => {
    button.addEventListener('click', () => verVideo(button.dataset.video));
  });
};

const initTests = () => {
  const botones = document.querySelectorAll('.test-btn');
  const formWrapper = document.querySelector('.test-form');
  const form = document.getElementById('test-form');
  const titulo = document.getElementById('test-titulo');
  const cancelar = document.getElementById('test-cancelar');
  const lista = document.getElementById('test-lista');

  let testActual = null;
  let tests = load(TESTS_KEY, []);

  const render = () => {
    lista.innerHTML = '';
    if (!tests.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Registra tus resultados para observar tendencias.';
      empty.className = 'badge';
      lista.appendChild(empty);
      return;
    }
    tests
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .forEach((test, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="card-meta">
            <span>${test.nombre}</span>
            <span>${new Date(test.fecha).toLocaleDateString()}</span>
          </div>
          <p><strong>Resultado:</strong> ${test.resultado}</p>
          ${test.notas ? `<p>${test.notas}</p>` : ''}
        `;
        const controls = document.createElement('div');
        controls.className = 'controls';
        const eliminar = document.createElement('button');
        eliminar.type = 'button';
        eliminar.textContent = 'Eliminar';
        eliminar.addEventListener('click', () => {
          tests.splice(index, 1);
          save(TESTS_KEY, tests);
          render();
        });
        controls.appendChild(eliminar);
        li.appendChild(controls);
        lista.appendChild(li);
      });
  };

  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      testActual = boton.dataset.test;
      titulo.textContent = `Registrar ${testActual}`;
      form.reset();
      formWrapper.hidden = false;
    });
  });

  cancelar.addEventListener('click', () => {
    formWrapper.hidden = true;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    tests.push({
      nombre: testActual,
      resultado: Number(data.resultado),
      notas: data.notas.trim(),
      fecha: new Date().toISOString(),
    });
    save(TESTS_KEY, tests);
    formWrapper.hidden = true;
    render();
  });

  render();
};

initNavegacion();
initVideos();
initRegistro();
initSmart();
initTareas();
initDatos();
initTests();
