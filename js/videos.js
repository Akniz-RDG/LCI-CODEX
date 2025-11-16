const videos = {
  registro: 'https://youtu.be/tutorial-registro',
  smart: 'https://youtu.be/tutorial-smart',
  tareas: 'https://youtu.be/tutorial-tareas',
  datos: 'https://youtu.be/tutorial-datos',
};

export function verVideo(seccion) {
  const url = videos[seccion];
  if (!url) return;
  window.open(url, '_blank');
}
