# Back CRUD Auth

API REST para gestión de tareas con autenticación JWT.

## Tecnologías

- Node.js
- Express
- Zod (validación)
- JWT (autenticación)
- MongoDB (o tu base de datos preferida)
- Swagger (documentación)
- Helmet, CORS, Rate Limit (seguridad)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tuusuario/back-crud-auth.git
   cd back-crud-auth
   ```

2. Instala dependencias:
   ```
   npm install
   ```

3. Configura variables de entorno en `.env`:
   ```
   PORT=3000
   JWT_SECRET=tu_clave_secreta
   MONGO_URI=tu_uri_de_mongodb
   ```

4. Inicia el servidor:
   ```
   npm start
   ```

## Endpoints principales

- `POST /register` — Registro de usuario
- `POST /login` — Login de usuario
- `GET /profile` — Perfil del usuario autenticado
- `POST /tasks` — Crear tarea
- `GET /tasks` — Listar tareas (soporta paginación)
- `GET /tasks/:id` — Obtener tarea por ID
- `PUT /tasks/:id` — Actualizar tarea
- `DELETE /tasks/:id` — Eliminar tarea

## Seguridad

- Autenticación JWT en rutas protegidas
- Validación de datos con Zod
- Rate limiting y Helmet para protección básica
- CORS configurado para el frontend

## Documentación

Accede a la documentación Swagger en:
```
http://localhost:3000/api-docs
```

## Testing

Ejecuta los tests con:
```
npm test
```

## Autor

Nahuel Anselmo