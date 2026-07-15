# Registro de Nuestro Proceso de Despliegue - Sweet Medical

En este documento registramos detalladamente todo el proceso y los cambios que realizamos para desplegar nuestra aplicación: el backend en Render, el frontend en Netlify, y la base de datos en MongoDB Atlas.

---

## 🛠️ Cambios que Realizamos en el Repositorio

Para automatizar el despliegue y corregir errores que impedían el funcionamiento de la app en producción, modificamos y agregamos los siguientes archivos en nuestro código:

1. **`server/server.js`:**
   - Modificamos el host y el puerto para que escuchen de manera dinámica (`process.env.HOST` y `process.env.PORT`), permitiendo que Render asigne el puerto correspondiente.
2. **`server/config/db.js`:**
   - Detectamos y solucionamos un error crítico de conexión (`InvalidNamespace`). Las cadenas de conexión que terminaban en barra inclinada provocaban una doble barra al concatenarse con el nombre de la base de datos. Implementamos un formateador para limpiar la URI antes de conectarse.
3. **Servicios del Frontend (`frontend/src/service/`):**
   - Encontramos que las peticiones a la API estaban hardcodeadas a `localhost:3000` en los archivos de médicos, servicios, pacientes y turnos. Reemplazamos estas direcciones locales por la variable global `API_BASE_URL` para que apunten al backend en la nube.
4. **`netlify.toml`:**
   - Creamos este archivo en la raíz para configurar de forma automática el build de Netlify, definiendo la carpeta base, el comando de construcción y la carpeta de salida.
5. **`frontend/public/_redirects`:**
   - Creamos este archivo para asegurar que Netlify redireccione todas las peticiones a `index.html`. Esto soluciona los errores 404 que se producían al recargar páginas secundarias manejadas por React Router.
6. **`render.yaml`:**
   - Creamos un archivo Blueprint en la raíz para definir toda la infraestructura del backend en Render, permitiendo que se despliegue automáticamente con un solo clic.

---

## 💾 Paso 1: Configuración de la Base de Datos (MongoDB Atlas)

Para centralizar nuestros datos en la nube y asegurar que persistieran, seguimos estos pasos:

1. Creamos un clúster gratuito en MongoDB Atlas.
2. Creamos un usuario de base de datos con permisos de lectura y escritura.
3. Configuramos las reglas de red para permitir la IP `0.0.0.0/0`, permitiendo que el servidor de Render se conecte sin problemas.
4. Obtuvimos la cadena de conexión de producción y reemplazamos la contraseña.

---

## 🌱 Paso 2: Sembrado de Datos en la Nube (Seeder)

Como el seeder original solo funcionaba de manera local usando contenedores de Docker, creamos una solución independiente:

1. Desarrollamos un script en Node.js en `db/seed-node.js` que se conecta a la base de datos remota mediante Mongoose, limpia las colecciones previas para no dejar registros duplicados e inyecta la base de datos semilla.
2. Configuramos el acceso al script a través de `npm run seed` en el archivo `package.json` de la raíz.
3. Ejecutamos el comando de forma local e introdujimos de manera interactiva la URL de MongoDB Atlas para poblar la base de datos en la nube.

---

## 🚀 Paso 3: Despliegue del Backend en Render

1. Creamos el servicio web en Render conectando nuestro repositorio de GitHub mediante el Blueprint de `render.yaml`.
2. Completamos la variable de entorno `DB_CONNECTION_STRING` en Render con la URI de MongoDB Atlas.
3. Monitoreamos el deploy hasta que pasó a estado **Live** y obtuvimos la URL pública de la API de producción.

---

## 🎨 Paso 4: Despliegue del Frontend en Netlify

1. Importamos el proyecto en Netlify conectando nuestra cuenta de GitHub.
2. Definimos la variable de entorno `VITE_API_BASE_URL` apuntando a la URL pública de nuestro backend en Render.
3. Ejecutamos un despliegue sin caché (Clean Cache and Deploy) en Netlify para obligar a Vite a compilar el frontend inyectando la URL de producción.
4. Verificamos que la aplicación web se conectara correctamente a Render y consumiera de manera exitosa los datos de MongoDB Atlas.
