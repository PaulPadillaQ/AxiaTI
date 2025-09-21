# 🔐 Configuración de Credenciales para AxiaTI

## 📋 Pasos para configurar las credenciales

### 1. Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota las credenciales del proyecto

### 2. Configurar variables de entorno del Backend

Copia el archivo `env.local` a `.env` en la carpeta `axiati-backend/`:

```bash
cd axiati-backend
cp env.local .env
```

Luego edita el archivo `.env` con tus credenciales reales:

```env
# Configuración de Supabase
SUPABASE_URL=https://[TU_PROJECT_REF].supabase.co
SUPABASE_ANON_KEY=tu-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-supabase-service-role-key

# Base de datos
DATABASE_URL=postgresql://postgres:[TU_PASSWORD]@db.[TU_PROJECT_REF].supabase.co:5432/postgres
DB_PASSWORD=[TU_PASSWORD]

# JWT (cambia estos valores)
JWT_SECRET=tu-super-secret-jwt-key-unico
JWT_REFRESH_SECRET=tu-super-secret-refresh-key-unico

# OpenAI (opcional)
OPENAI_API_KEY=tu-openai-api-key
```

### 3. Configurar variables de entorno del Frontend

Copia el archivo `env.local` a `.env.local` en la carpeta `frontend/`:

```bash
cd frontend
cp env.local .env.local
```

Luego edita el archivo `.env.local` con tus credenciales reales:

```env
# Configuración de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[TU_PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key

# API del backend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Obtener credenciales de Supabase

#### En el Dashboard de Supabase:
1. Ve a **Settings** > **API**
2. Copia los siguientes valores:
   - **Project URL**: `https://[project-ref].supabase.co`
   - **anon public**: Clave pública anónima
   - **service_role**: Clave de servicio (mantener secreta)

#### En Database Settings:
1. Ve a **Settings** > **Database**
2. Copia la **Connection string** o configura manualmente:
   - **Host**: `db.[project-ref].supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: Tu contraseña de base de datos

### 5. Configurar OpenAI (Opcional)

Si quieres usar las funciones de IA:
1. Ve a [platform.openai.com](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys**
4. Crea una nueva clave API
5. Copia la clave y agrégala a tus archivos `.env`

### 6. Verificar configuración

#### Backend:
```bash
cd axiati-backend
yarn install
yarn dev
```

#### Frontend:
```bash
cd frontend
yarn install
yarn dev
```

### 7. Ejecutar migraciones de base de datos

1. Ve al **SQL Editor** en Supabase
2. Ejecuta el archivo `database/migrations/001_initial_schema.sql`
3. Ejecuta el archivo `database/policies/rls_policies.sql`

## 🔒 Seguridad

### ⚠️ Importante:
- **NUNCA** subas archivos `.env` al repositorio
- **NUNCA** compartas tus claves de servicio
- **SIEMPRE** usa variables de entorno en producción
- **ROTA** las claves regularmente

### Archivos que NO deben subirse:
- `.env`
- `.env.local`
- `.env.production`
- Cualquier archivo con credenciales

### Archivos de ejemplo seguros:
- `env.example`
- `env.local` (template)
- `env.template`

## 🚀 Despliegue

### Variables de entorno en producción:

#### Vercel (Frontend):
```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key
NEXT_PUBLIC_API_URL=https://tu-backend-url.com
```

#### Supabase (Backend):
```env
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu-supabase-service-role-key
JWT_SECRET=tu-jwt-secret-production
```

## 🆘 Troubleshooting

### Problemas comunes:

1. **Error de conexión a Supabase**:
   - Verifica que la URL sea correcta
   - Verifica que las claves sean válidas
   - Verifica que el proyecto esté activo

2. **Error de base de datos**:
   - Verifica que la contraseña sea correcta
   - Verifica que el schema `AxiaTI` exista
   - Verifica que las migraciones se hayan ejecutado

3. **Error de JWT**:
   - Verifica que las claves JWT sean únicas
   - Verifica que no contengan caracteres especiales

4. **Error de CORS**:
   - Verifica que las URLs en `CORS_ORIGINS` sean correctas
   - Verifica que el frontend y backend estén en los puertos correctos
