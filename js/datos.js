import { load, save } from './storage.js';

const STORAGE_KEY = 'valorant-datos';

const baseState = {
  nickname: '',
  rol: '',
  agente: '',
  winrate: '',
  kda: '',
  mapas: '',
  debilidades: '',
};

const createRow = (label, value) => `
  <div>
    <strong>${label}</strong>
    <p>${value || '—'}</p>
  </div>
`;

export function initDatos() {
  const form = document.getElementById('datos-form');
  const resumen = document.getElementById('datos-resumen');
  let datos = load(STORAGE_KEY, baseState);

  Object.entries(datos).forEach(([key, value]) => {
    if (form.elements[key]) {
      form.elements[key].value = value;
    }
  });

  const render = () => {
    resumen.innerHTML = `
      ${createRow('Nickname / Rango', datos.nickname)}
      ${createRow('Rol', datos.rol)}
      ${createRow('Agente principal', datos.agente)}
      ${createRow('Winrate (%)', datos.winrate)}
      ${createRow('KDA promedio', datos.kda)}
      ${createRow('Mapas débiles', datos.mapas)}
      ${createRow('Debilidades percibidas', datos.debilidades)}
    `;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    datos = { ...datos, ...data };
    save(STORAGE_KEY, datos);
    render();
  });

  render();
}
