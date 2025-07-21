# Prueba Técnica – Xpertcode

**Stack usado:** Node.js (Express) + MongoDB + Angular 20 con Material UI

---

## 🚀 Instalación rápida

```bash
# 1. Clona el repositorio
git clone https://github.com/davidapraez/prueba-xcode-backend-frontend.git
cd prueba-xcode-backend-frontend
```

### 📦 Backend

```bash
cd backend-xpertcode
npm install
cp .env.example .env   # Coloca tu CAT_API_KEY en el archivo .env
npm run dev            # Inicia el servidor en http://localhost:3000
```

### 💻 Frontend

```bash
cd ../frontend-xpertcode
npm install
ng serve --port 4200   # Aplica en http://localhost:4200
```

Abre el navegador, regístrate y luego inicia sesión.  
Verás el panel con tres secciones:

- Ver Gatos
- Tabla de Razas
- Mi Perfil (protegida por JWT)

---

## 🔗 Endpoints clave (Backend)

| Método | Ruta                                                 | Descripción                |
| ------ | ---------------------------------------------------- | -------------------------- |
| POST   | `/api/users/register`                                | Registro de usuario        |
| POST   | `/api/users/login`                                   | Login y obtención de token |
| GET    | `/api/users/me`                                      | Perfil (requiere JWT)      |
| GET    | `/api/breeds`                                        | Lista todas las razas      |
| GET    | `/api/breeds/search?q=sphynx`                        | Búsqueda por nombre        |
| GET    | `/api/breeds/images/bybreedid?breed_id=abys&limit=3` | Fotos por raza             |

---

## 📚 Preguntas teóricas

### 1. Ciclo de vida de un middleware en Express

- La petición llega y se crea `req`/`res`.
- El middleware lee o modifica `req`/`res`.
- Si llama `next()`, pasa al siguiente middleware.
- Si envía `res.send()`, la cadena se detiene.
- Para errores se usa `next(err)`.

### 2. JWT vs sesiones de servidor

| Característica | JWT         | Sesiones        |
| -------------- | ----------- | --------------- |
| Almacenamiento | Cliente     | Servidor        |
| Escalabilidad  | Stateless   | Requiere estado |
| Revocación     | Lista negra | Borrar sesión   |

### 3. CORS en Express

Permite que un frontend en otro dominio consuma la API.

```js
const cors = require("cors");
app.use(cors({ origin: "http://localhost:4200" }));
```

### 4. Ventajas de Standalone Components (Angular 16+)

- Eliminan `NgModules` y reducen código repetitivo.
- Permiten lazy loading con `loadComponent`.
- Menor tiempo de arranque y tamaño del bundle.

### 5. Observables vs Promesas en Angular

| Característica | Promesas | Observables        |
| -------------- | -------- | ------------------ |
| Emisiones      | Una sola | Múltiples          |
| Cancelación    | ❌       | ✅ `unsubscribe()` |
| Operadores     | Básicos  | Potente con RxJS   |

> En este proyecto los servicios HTTP usan Observables.

### 6. Ejemplo de principios SOLID

- **S:** `CatsService` solo llama a TheCatAPI.
- **O:** Se puede añadir `DogsService` sin modificar `CatsService`.
- **L:** `AuthMiddleware` extiende reglas sin romper contrato.
- **I:** Interfaces (`LoginResponse`, `RegisterResponse`) evitan campos innecesarios.
- **D:** Se inyecta `HttpClient` en lugar de instanciarlo directamente.

### 7. Ventajas de contenerizar con Docker

- Elimina el problema “funciona en mi máquina”.
- Aísla dependencias y versiones de Node.js.
- Facilita CI/CD con imágenes reutilizables.

---

## ✅ Comentarios finales

El archivo `.env` se incluye para agilizar la prueba.  
Contiene solo la variable `CAT_API_KEY`.

Faltan tests unitarios, algunos ajustes responsive, y una imagen Docker para el frontend.  
El backend y MongoDB se levantan correctamente.

¡Muchas gracias, saludos!
