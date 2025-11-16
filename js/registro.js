import { load, save } from './storage.js';

const STORAGE_KEY = 'valorant-registros';

const createRegistroCard = (registro, index, onDelete) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="card-meta">
      <span>${new Date(registro.fecha).toLocaleDateString()}</span>
      <span class="badge">Sensación ${registro.sensacion}/10</span>
    </div>
    <p><strong>Tareas:</strong> ${registro.tareas}</p>
    ${registro.observaciones ? `<p><strong>Observaciones:</strong> ${registro.observaciones}</p>` : ''}
    ${registro.video ? `<a href="${registro.video}" target="_blank" rel="noopener" class="badge">Video</a>` : ''}
  `;

  const controls = document.createElement('div');
  controls.className = 'controls';
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => onDelete(index));
  controls.appendChild(deleteBtn);
  li.appendChild(controls);
  return li;
};

export function initRegistro() {
  const form = document.getElementById('registro-form');
  const lista = document.getElementById('registro-lista');
  let registros = load(STORAGE_KEY, []);

  const render = () => {
    lista.innerHTML = '';
    if (!registros.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Aún no registraste entrenamientos.';
      empty.className = 'badge';
      lista.appendChild(empty);
      return;
    }
    registros
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .forEach((registro, index) => {
        lista.appendChild(createRegistroCard(registro, index, handleDelete));
      });
  };

  const handleDelete = (index) => {
    registros.splice(index, 1);
    save(STORAGE_KEY, registros);
    render();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    registros.push({
      fecha: data.fecha,
      sensacion: Number(data.sensacion),
      tareas: data.tareas.trim(),
      observaciones: data.observaciones.trim(),
      video: data.video.trim(),
    });
    save(STORAGE_KEY, registros);
    form.reset();
    render();
  });

  render();
}
