import { load, save } from './storage.js';

const STORAGE_KEY = 'valorant-smart';

const estadoLabels = {
  pendiente: 'Pendiente',
  progreso: 'En progreso',
  logrado: 'Logrado',
};

const createSmartCard = (objetivo, index, onUpdateEstado, onDelete) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="card-meta">
      <span>${objetivo.descripcion}</span>
      <span class="badge">${estadoLabels[objetivo.estado]}</span>
    </div>
    <p><strong>Indicador:</strong> ${objetivo.indicador}</p>
    <p><strong>Fecha límite:</strong> ${new Date(objetivo.fecha).toLocaleDateString()}</p>
    ${objetivo.relevancia ? `<p><strong>Relevancia:</strong> ${objetivo.relevancia}</p>` : ''}
    ${objetivo.etiqueta ? `<span class="badge">${objetivo.etiqueta}</span>` : ''}
  `;

  const controls = document.createElement('div');
  controls.className = 'controls';

  const estados = ['pendiente', 'progreso', 'logrado'];
  estados.forEach((estado) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = estadoLabels[estado];
    if (objetivo.estado === estado) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => onUpdateEstado(index, estado));
    controls.appendChild(button);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => onDelete(index));
  controls.appendChild(deleteBtn);

  li.appendChild(controls);
  return li;
};

export function initSmart() {
  const form = document.getElementById('smart-form');
  const lista = document.getElementById('smart-lista');
  let objetivos = load(STORAGE_KEY, []);

  const render = () => {
    lista.innerHTML = '';
    if (!objetivos.length) {
      const empty = document.createElement('li');
      empty.textContent = 'Define tu primer objetivo SMART.';
      empty.className = 'badge';
      lista.appendChild(empty);
      return;
    }
    objetivos
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      .forEach((objetivo, index) => lista.appendChild(createSmartCard(objetivo, index, updateEstado, handleDelete)));
  };

  const updateEstado = (index, estado) => {
    objetivos[index].estado = estado;
    save(STORAGE_KEY, objetivos);
    render();
  };

  const handleDelete = (index) => {
    objetivos.splice(index, 1);
    save(STORAGE_KEY, objetivos);
    render();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    objetivos.push({
      descripcion: data.descripcion.trim(),
      indicador: data.indicador.trim(),
      fecha: data.fecha,
      etiqueta: data.etiqueta.trim(),
      relevancia: data.relevancia.trim(),
      estado: data.estado,
    });
    save(STORAGE_KEY, objetivos);
    form.reset();
    render();
  });

  render();
}
