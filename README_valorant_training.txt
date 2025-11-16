# 📔 Valorant Player Logbook

Bitácora offline para planificar entrenamientos, hacer seguimiento de objetivos SMART, registrar tareas técnicas y almacenar datos clave del jugador con resultados psicológicos básicos. Toda la información vive en `localStorage`, por lo que basta con abrir `index.html` en cualquier navegador moderno.

---

## 🚀 ¿Qué se incluye?

- **Dashboard único (`index.html`)** con navegación por secciones.
- **Estilos modernos** (`styles/main.css`) con modo oscuro responsivo.
- **Módulos JavaScript** para cada bloque funcional (`js/*.js`).
- **Persistencia local** para registros, objetivos, tareas, datos personales y tests (POMPS, CSAI-2, CPRD).
- **Botones de guía en video** por sección para abrir tutoriales sugeridos.

---

## 🗂️ Estructura

```
valorant-bitacora/
├── index.html
├── styles/
│   └── main.css
└── js/
    ├── main.js        # Inicializa navegación y tests
    ├── registro.js    # Registro diario/semanal
    ├── smart.js       # Objetivos SMART
    ├── tareas.js      # Gestión de tareas
    ├── datos.js       # Perfil del jugador
    ├── videos.js      # Abre los tutoriales
    └── storage.js     # Helper de persistencia
```

---

## ✍️ Registro de actividades

- Guarda fecha, sensación subjetiva, tareas realizadas, observaciones y video de referencia.
- Lista ordenada cronológicamente con opción de eliminar entradas antiguas.

## 🎯 Objetivos SMART

- Define descripción, indicador, fecha límite, relevancia, etiqueta y estado.
- Cambia el estado con un clic (pendiente → progreso → logrado) y elimina objetivos cumplidos.

## ✅ Tareas específicas

- Clasifica por tipo (aim, comunicación, utilidad, teoría, VOD) y asigna día opcional.
- Botón para marcar completadas y ordenar pendientes primero.

## 📊 Datos del jugador

- Formulario para nickname/rango, rol, agente, winrate, KDA, mapas débiles y debilidades subjetivas.
- El resumen se actualiza en tiempo real tras guardar.

## 🧠 Tests psicológicos

- Botones rápidos para registrar puntuaciones de POMPS, CSAI-2 o CPRD.
- Guardado con fecha automática y opción de eliminar.

---

## 🌐 Uso

1. Clona el repositorio o descarga los archivos.
2. Abre `index.html` en tu navegador.
3. Añade tus datos y deja que el navegador recuerde todo vía `localStorage` (no se envía nada a internet).

> Sugerencia: exporta periódicamente el `localStorage` o imprime la página para conservar respaldos.

---

## 📣 Autor

**Rodrigo Figueroa** – Psicólogo deportivo y programador fullstack en formación.
