
# 📔 Valorant Player Logbook

Una bitácora digital para jugadores de Valorant que permite registrar entrenamientos, prácticas, tareas y objetivos SMART, todo basado en evidencia. Incluye soporte para enlaces a videos guía en cada sección.

---

## 🚀 Objetivo

Desarrollar una app web local, completamente offline, que permita al jugador de Valorant llevar un control estructurado de su entrenamiento, rendimiento y progreso psicológico/técnico.

---

## 📋 Funcionalidades

1. Registro diario/semanal de actividades y reflexiones.
2. Creación de objetivos SMART personalizados.
3. Listado de tareas organizadas por tipo (aim, mapas, utilidad, teoría).
4. Registro de estadísticas y datos clave del jugador.
5. Enlace opcional a un video tutorial explicativo por cada módulo.

---

## 🗂️ Estructura del Proyecto

```
valorant-bitacora/
├── index.html                # Dashboard principal
├── styles/
│   └── main.css              # Estilos generales
├── js/
│   ├── main.js               # Navegación y eventos globales
│   ├── registro.js           # Registro diario/semanal
│   ├── smart.js              # Objetivos SMART
│   ├── tareas.js             # Tareas programadas y ejecutadas
│   ├── datos.js              # Información del jugador
│   └── videos.js             # Sistema de ayuda en video
└── README.md                 # Documentación técnica
```

---

## ✍️ Registro de actividades (registro.js)

Cada entrada incluye:
- Fecha
- Tareas realizadas
- Observaciones o reflexiones
- Sensación subjetiva del día (0 a 10)
- Enlace a video explicativo de cómo usar esta sección

---

## 🎯 Objetivos SMART (smart.js)

Cada objetivo contiene:
- Descripción clara
- Indicador de éxito (cómo saber si se logró)
- Fecha límite
- Relevancia personal
- Estado actual (pendiente, en progreso, logrado)

Opcional: etiqueta (rol, mapa, agente, mecánica)

---

## ✅ Tareas específicas (tareas.js)

Funcionalidad para:
- Añadir, editar y eliminar tareas
- Marcar tareas como completadas
- Categorizar por tipo (aim, comunicación, utilidad, teoría, VOD)
- Asignar a días específicos
- Incluir video guía por tipo de tarea

---

## 📊 Datos del jugador (datos.js)

Campos disponibles:
- Nickname / Rango actual
- Agente principal y % de winrate
- Mapas débiles
- KDA promedio
- Rol principal
- Percepción subjetiva de debilidades


## 📊 Hacer test psicológicos
- Realizar test POMPS
- Realizar test CSAI-2
- Realizar test CPRD
- Descargar informe de resultados

---

## 🎥 Videos por sección (videos.js)

```js
const videos = {
  "registro": "https://youtu.be/tutorial-registro",
  "smart": "https://youtu.be/tutorial-smart",
  "tareas": "https://youtu.be/tutorial-tareas",
  "datos": "https://youtu.be/tutorial-datos"
};

function verVideo(seccion) {
  window.open(videos[seccion], "_blank");
}
```

---

## 🧰 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript modular
- `localStorage` para persistencia local
- Diseño responsivo

---

## 🌐 Uso

- Abrir `index.html` en cualquier navegador moderno.
- No requiere instalación ni conexión a internet.
- Los datos se guardan localmente en el navegador del usuario.

---

## 🧩 Futuras mejoras

- Exportar bitácora completa a PDF o HTML
- Filtrado por categorías y fechas
- Sincronización opcional con nube
- Validación automática de progresos SMART
- Traductor ES/EN

---

## 📣 Autor

**Rodrigo Figueroa**  
Psicólogo deportivo y programador fullstack en formación.  
Especializado en intervención en Esports y desarrollo de herramientas digitales basadas en evidencia.

---
