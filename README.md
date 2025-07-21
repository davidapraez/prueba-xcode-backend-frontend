¡Bienvenido!
Este proyecto demuestra un stack Node.js (Express) + MongoDB + Angular 20 con Material UI.

Estructura
Carpeta / archivo               Descripción breve
backend-xpertcode               API REST (usuarios, razas de gatos, imágenes)
frontend-xpertcode              SPA Angular con login, panel y consumo de API
docker-compose.yml              Levanta MongoDB para desarrollo local
.env                            Variables (incluye tu CAT_API_KEY)
THEORY.md                       Preguntas teóricas respondidas (ver más abajo)

Instalación rápida
git clone https://github.com/davidapraez/prueba-xcode-backend-frontend.git
cd prueba-xcode-backend-frontend

1· Backend
cd backend-xpertcode
npm install
cp .env.example .env  # coloca CAT_API_KEY en .env
npm run dev           # http://localhost:3000

2· Frontend
cd ../frontend-xpertcode
npm install
ng serve --port 4200

Abre el navegador, regístrate y luego inicia sesión. Al entrar verás el panel con tres secciones: Ver Gatos, Tabla de Razas y Mi Perfil (protegida por JWT).

Endpoints clave (backend)
Método  Ruta                                                          Descripción
POST    /api/users/register                                           Registro de usuario
POST    /api/users/login                                              Login → devuelve { token }
GET     /api/users/me                                                 Perfil (requiere Bearer <token>)
GET     /api/breeds                                                   Lista todas las razas
GET     /api/breeds/search?q=sphynx                                   Búsqueda
GET     /api/breeds/images/bybreedid?breed_id=abys&limit=3            Fotos por raza

Preguntas teóricas (respuestas resumidas)

1. ¿Cómo funciona el ciclo de vida de un middleware en Express?
   - La petición llega a Express y se crea el objeto req.
   - El middleware inspecta / modifica req o res.
   - Si llama next(), pasa al siguiente middleware; si envía respuesta (res.send) se corta la cadena.
   - Si ocurre un error, se pasa a un error middleware usando next(err).

2. ¿JWT o sesiones de servidor?
   Aspecto        JWT (este proyecto)          Sesión en servidor
   Almacenaje     Token firmado en el cliente  ID + estado en servidor
   Escalabilidad  Stateless; ideal microserv.  Requiere sticky / store
   Revocación     Manual (lista negra)          Basta con borrar sesión

3. ¿Para qué sirve CORS y cómo lo habilitas?
   Permite que un frontend alojado en un dominio distinto consuma tu API.
   En Express basta con el paquete cors:
   import cors from 'cors';
   app.use(cors({ origin: 'http://localhost:4200' }));

4. Ventajas de los Standalone Components (Angular 16+)
   - No necesitas NgModules; menos boilerplate.
   - Lazy‑loading directo con loadComponent.
   - Arranque más rápido y menor tamaño de bundle.

5. Observables vs Promesas en Angular
   Promesa vs Observable:
   - Emisiones: Única vs Múltiples
   - Cancelación: No vs Sí (unsubscribe)
   - Operadores: Limitados vs RxJS (+200)
   - Este proyecto: HTTP vs HTTP (Observables por defecto)

6. Ejemplo de principio SOLID aplicado
   - S (Single Responsibility): CatsService solo maneja llamadas a TheCatAPI, no trata estado global.
   - O (Open/Closed): Para añadir “perros” creo DogsService, no modifico CatsService.
   - L (Liskov): AuthMiddleware extiende la idea de middleware sin romper su contrato (next).
   - I (Interface Segregation): Interfaces LoginResponse / RegisterResponse evitan campos innecesarios.
   - D (Dependency Inversion): En Angular inyecto HttpClient en lugar de instanciarlo.

7. Ventajas de contenerizar con Docker
   - “Funciona en mi máquina” deja de ser problema.
   - Aísla dependencias y versiones de Node.
   - Facilita CI/CD: mismo contenedor en test y prod.

Comentarios finales
El archivo .env se deja en el repo para agilizar la prueba; solo contiene la variable CAT_API_KEY.
Aún faltan tests y ajuste responsive; los apunté en la sección Pendiente, también me faltó hacer la parte de Docker: tuve un problema para levantar el frontend, pero sí levanto el Backend y MongoDB.

Muchas gracias, saludos!
