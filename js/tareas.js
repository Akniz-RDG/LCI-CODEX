import { load, save } from './storage.js';

const STORAGE_KEY = 'valorant-tareas';

const tipoLabels = {
  aim: 'Aim',
  comunicacion: 'Comunicación',
  utilidad: 'Utilidad',
  teoria: 'Teoría',
  vod: 'VOD Review',
};

const createTareaCard = (tarea, index, onToggle, onDelete) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="card-meta">
      <span>${tarea.nombre}</span>
      <span class="badge ${tarea.completada ? 'success' : ''}">${tarea.completada ? 'Completada' : 'Pendiente'}</span>
    </div>
    <p><strong>Tipo:</strong> ${tipoLabels[tarea.tipo]}</p>
    ${tarea.descripcion ? `<p>${tarea.descripcion}</p>` : ''}
    ${tarea.dia ? `<p><strong>Día:</strong> ${new Date(tarea.dia).toLocaleDateString()}</p>` : ''}
    ${tarea.video ? `<a class="badge" href="${tarea.video}" target="_blank" rel="noopener">Video guía</a>` : ''}
  `;

  const controls = document.createElement('div');
  controls.className = 'controls';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = tarea.completada ? 'Marcar pendiente' : 'Marcar completa';
  toggle.addEventListener('click', () => onToggle(index));
  controls.appendChild(toggle);

  const del = document.createElement('button');
  del.type = 'button';
  del.textContent = 'Eliminar';
  del.addEventListener('click', () => onDelete(index));
  controls.appendChild(del);

  li.appendChild(controls);
  return li;
};

export function initTareas() {
  const form = document.getElementById('tareas-form');
  const lista = document.getElementById('tareas-lista');
  let tareas = load(STORAGE_KEY, []);

  const render = () => {
    lista.innerHTML = '';
    if (!tareas.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Registra las tareas clave de la semana.';
      empty.className = 'badge';
      lista.appendChild(empty);
      return;
    }
    tareas
      .sort((a, b) => (a.completada === b.completada ? 0 : a.completada ? 1 : -1))
      .forEach((tarea, index) => lista.appendChild(createTareaCard(tarea, index, toggle, remove)));
  };

  const toggle = (index) => {
    tareas[index].completada = !tareas[index].completada;
    save(STORAGE_KEY, tareas);
    render();
  };

  const remove = (index) => {
    tareas.splice(index, 1);
    save(STORAGE_KEY, tareas);
    render();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    tareas.push({
      nombre: data.nombre.trim(),
      dia: data.dia,
      tipo: data.tipo,
      descripcion: data.descripcion.trim(),
      video: data.video.trim(),
      completada: false,
    });
    save(STORAGE_KEY, tareas);
    form.reset();
    render();
  });

  render();
}
