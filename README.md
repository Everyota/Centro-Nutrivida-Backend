# Centro Nutrivida - Backend

Backend desarrollado con Node.js, Express y SQLite para Centro Nutrivida. Proporciona una API REST para gestionar usuarios, autenticación, categorías, servicios y reservas de pacientes.

## 1. Requisitos previos

- NVM (Node Version Manager).
- Node.js y npm.
- Una terminal (PowerShell en Windows o Bash en Linux).

No es necesario instalar un servidor de base de datos externo, ya que el proyecto utiliza SQLite.

## 2. Instalación y actualización de Node.js

Instalar y activar Node.js 22.11.0:

```bash
nvm install 22.11.0
nvm use 22.11.0
```

Para instalar y utilizar la última versión LTS, ejecutar los siguientes comandos según el sistema operativo.

**Windows (NVM for Windows):**

```powershell
nvm install lts
nvm use lts
```

**Linux (NVM):**

```bash
nvm install --lts
nvm use --lts
```

Verificar las versiones instaladas:

```bash
node -v
npm -v
```

## 3. Instalación de dependencias

Abrir una terminal en la carpeta raíz del backend, donde se encuentra el archivo `package.json`, y ejecutar:

```bash
npm install
```

También se puede utilizar su forma abreviada:

```bash
npm i
```

Ambos comandos son equivalentes; solo es necesario ejecutar uno de ellos.

## 4. Configuración de variables de entorno

Crear un archivo llamado `.env` en la carpeta raíz del proyecto y completar los datos del administrador:

```dotenv
ADMIN_RUT=
ADMIN_NOMBRES=
ADMIN_APELLIDOS=
ADMIN_CORREO=
ADMIN_CELULAR=
ADMIN_PASSWORD=
```

Completar todos los campos con los datos correspondientes. La contraseña debe tener al menos 8 caracteres. No subir el archivo `.env` al repositorio.

## 5. Inicialización y ejecución del backend

### Windows

Ejecutar los siguientes comandos en orden:

```powershell
node .\initDB.js
node .\crearAdmin.js
node .\server.js
```

### Linux (incluido Linux Mint)

En Linux no se debe utilizar el prefijo `.\` de Windows. Ejecutar:

```bash
node initDB.js
node crearAdmin.js
node server.js
```

### Función de cada comando

| Archivo | Función |
| --- | --- |
| `initDB.js` | Inicializa la base de datos SQLite y carga los datos iniciales. |
| `crearAdmin.js` | Crea el usuario administrador si todavía no existe. |
| `server.js` | Inicia el servidor de la API REST. |

**Importante:** `initDB.js` elimina y vuelve a crear las tablas existentes. Utilizarlo únicamente en la instalación inicial o cuando se quiera reiniciar la base de datos, previa copia de seguridad si hay información que conservar.

## 6. Acceso al backend

Una vez iniciado el servidor, la API estará disponible en:

```text
http://localhost:3000
```

Rutas principales:

- `/api/v1/categorias`
- `/api/v1/servicios`
- `/api/v1/auth`
- `/api/v1/reservas`

El backend está configurado para permitir solicitudes desde el frontend en `http://localhost:5173`.

## 7. Ejecuciones posteriores

Si las dependencias están instaladas y la base de datos ya fue inicializada, solo es necesario ejecutar:

```bash
node server.js
```

Para detener el servidor, presionar `Ctrl + C` en la terminal.
