# Sistema de Citas para Tutorías (Backend)

Este es un backend desarrollado en Node.js y Express para gestionar citas propuestas por tutores. Utiliza SQLite como base de datos para facilitar su ejecución inmediata.

## Características
1. **Propuesta de Citas:** Los tutores pueden crear propuestas con fecha y hora.
2. **Persistencia:** Las citas se guardan en una base de datos SQLite (`tutorias.sqlite`).
3. **Gestión de Estado:** Permite que el tutorado acepte o rechace la cita.
4. **Estados Soportados:** `pendiente`, `aceptada`, `rechazada`.

## Instalación

1. Clona el repositorio.
2. Navega a la carpeta del proyecto.
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar en modo desarrollo (requiere `nodemon`):
```bash
npm run dev
```

Para iniciar normalmente:
```bash
npm start
```

## Endpoints de la API

### 1. Proponer una cita (Tutor)
- **URL:** `POST /api/appointments`
- **Cuerpo (JSON):**
  ```json
  {
    "tutorName": "Dr. Garcia",
    "tuteeName": "Juan Perez",
    "proposedDateTime": "2024-05-20T10:00:00Z",
    "notes": "Revisión de avance de tesis"
  }
  ```

### 2. Aceptar/Rechazar cita (Tutorado)
- **URL:** `PATCH /api/appointments/:id/status`
- **Cuerpo (JSON):**
  ```json
  {
    "status": "aceptada" 
  }
  ```
  *(Estados válidos: `aceptada`, `rechazada`)*

### 3. Listar todas las citas
- **URL:** `GET /api/appointments`

## Estructura del Proyecto
- `config/`: Configuración de la base de datos (Sequelize).
- `models/`: Definición del esquema de la tabla de citas.
- `controllers/`: Lógica de negocio para las rutas.
- `routes/`: Definición de los endpoints.
