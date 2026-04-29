# ProEvent Backend

Layered Node.js/Express API for the ProEvent platform.

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para correr el backend en tu entorno local:

1. **Clonar el repositorio y entrar a la carpeta** (si no lo has hecho):
   ```bash
   cd backend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz de `backend/` usando como guía el bloque de variables de abajo.

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   El servidor correrá por defecto en `http://localhost:5000`.

## 🏗️ Architecture
- **Models**: Mongoose schemas.
- **Repositories**: Direct database interaction.
- **Services**: Business logic (Auth, Email, etc.).
- **Controllers**: Parsing requests and sending responses.
- **Routes**: API endpoint definitions.
- **Middlewares**: Validation, Authentication, Error handling.

## 🔑 Endpoints de la API (Documentación)

A continuación, se describen los endpoints principales. Puedes probarlos importando el archivo `postman_collection.json` ubicado en la raíz del proyecto.

### Autenticación (Auth)
- `POST /api/auth/register`
  - **Descripción**: Registra un nuevo usuario y envía un correo de verificación.
  - **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- `POST /api/auth/login`
  - **Descripción**: Inicia sesión y devuelve un token JWT.
  - **Body**: `{ "email": "...", "password": "..." }`
- `GET /api/auth/verify?token=...`
  - **Descripción**: Verifica la dirección de correo electrónico del usuario.

### Eventos (Events)
- `GET /api/events`
  - **Descripción**: Lista todos los eventos. Soporta filtros opcionales (`?category=id` o `?organizer=id`).
- `GET /api/events/:id`
  - **Descripción**: Obtiene los detalles de un evento específico por su ID.
- `POST /api/events`
  - **Descripción**: Crea un nuevo evento. Requiere autenticación (JWT en cabecera `Authorization: Bearer <token>`).
- `PUT /api/events/:id`
  - **Descripción**: Actualiza un evento existente. Requiere ser el creador del evento.
- `DELETE /api/events/:id`
  - **Descripción**: Elimina un evento. Requiere ser el creador del evento.

### Categorías (Categories)
- `GET /api/categories`
  - **Descripción**: Obtiene la lista de todas las categorías de eventos disponibles.
- `POST /api/categories`
  - **Descripción**: Crea una nueva categoría.

## ⚙️ Environment Variables (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
EMAIL_FROM="ProEvent <noreply@proevent.com>"
```
