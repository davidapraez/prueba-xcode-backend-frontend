¡Bienvenido!
Este proyecto demuestra un stack Node.js (Express) + MongoDB + Angular 20 con Material UI.

====================
Estructura del proyecto
====================
Carpeta / archivo     Descripción breve
-------------------   -----------------------------------------------
backend-xpertcode     API REST (usuarios, razas de gatos, imágenes)
frontend-xpertcode    SPA Angular con login, panel y consumo de API
docker-compose.yml    Levanta MongoDB para desarrollo local
.env                  Variables (incluye tu CAT_API_KEY)
THEORY.md             Preguntas teóricas respondidas (ver más abajo)

====================
Instalación rápida
====================
1. Clona el repositorio
   git clone https://github.com/davidapraez/prueba-xcode-backend-frontend.git
   cd prueba-xcode-backend-frontend

2. Backend
   cd backend-xpertcode
   npm install
   cp .env.example .env   (coloca tu CAT_API_KEY en .env)
   npm run dev            (servidor en http://localhost:3000)

3. Frontend
   cd ../frontend-xpertcode
   npm install
   ng serve --port 4200   (aplicación en http://localhost:4200)

Abre el navegador, regístrate y luego inicia sesión.
Al entrar verás el panel con tres secciones: Ver Gatos, Tabla de Razas y Mi Perfil (protegida por JWT).

====================
Endpoints clave (backend)
====================
Método   Ruta                                                            Descripción
------   --------------------------------------------------------------   ---------------------------------------
POST     /api/users/register                                              Registro de usuario
POST     /api/users/login                                                 Login y obtención de token
GET      /api/users/me                                                   Perfil (requiere encabezado Authorization: Bearer <token>)
GET      /api/breeds                                                      Lista todas las razas
GET      /api/breeds/search?q=sphynx                                      Búsqueda por nombre
GET      /api/breeds/images/bybreedid?breed_id=abys&limit=3               Fotos por raza

====================
Preguntas teóricas
====================

1. Ciclo de vida de un middleware en Express
   - La petición llega y se crea req/res.
   - El middleware lee o modifica req/res.
   - Si llama next(), pasa al siguiente middleware.
   - Si envía res.send(), la cadena se detiene.
   - Para errores se usa next(err), que redirige al manejador de errores.

2. JWT vs sesiones de servidor
   Almacenaje: el JWT vive en el cliente; la sesión vive en el servidor.
   Escalabilidad: JWT es stateless y más fácil de escalar.
   Revocación: con JWT se debe mantener una lista negra; con sesiones basta borrar el registro del servidor.

3. CORS en Express
   Permite que un frontend en otro dominio consuma la API.
   Ejemplo:
     const cors = require('cors');
     app.use(cors({ origin: 'http://localhost:4200' }));

4. Ventajas de Standalone Components en Angular 16+
   - Eliminan NgModules y reducen código repetitivo.
   - Permiten lazy loading con loadComponent.
   - Reducen el tiempo de arranque y tamaño del bundle.

5. Observables vs Promesas en Angular
   Emisiones: Promesa (una única), Observable (múltiples).
   Cancelación: Promesa no, Observable sí (unsubscribe).
   Operadores: Observables ofrecen toda la potencia de RxJS.
   En este proyecto los servicios HTTP usan Observables.

6. Ejemplo de principios SOLID
   S - CatsService solo llama a TheCatAPI.
   O - Para añadir perros se crea DogsService sin modificar CatsService.
   L - AuthMiddleware extiende reglas de Express sin romper su contrato.
   I - Interfaces LoginResponse y RegisterResponse evitan campos innecesarios.
   D - El código inyecta HttpClient en vez de instanciarlo directamente.

7. Ventajas de contenerizar con Docker
   - Elimina el problema "funciona en mi máquina".
   - Aísla dependencias y versiones de Node.
   - Facilita CI/CD al usar la misma imagen en pruebas y producción.

====================
Comentarios finales
====================
El archivo .env se deja en el repo para agilizar la prueba; solo contiene la variable CAT_API_KEY.

Faltan tests unitarios y algunos ajustes responsive, además de una imagen Docker para el frontend. El backend y MongoDB se levantan correctamente.

Muchas gracias, saludos.
