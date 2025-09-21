# 🎫 AxiaTI Backend

Backend API para el sistema de gestión de tickets de soporte TI construido con **NestJS**.

## 🚀 Características

- ✅ **Arquitectura modular** con NestJS
- ✅ **Autenticación JWT** con refresh tokens
- ✅ **Validación robusta** con class-validator
- ✅ **Documentación automática** con Swagger
- ✅ **Manejo de errores** centralizado
- ✅ **Logging** estructurado
- ✅ **CORS** configurado
- ✅ **TypeScript** completo

## 📁 Estructura del proyecto

```
src/
├── main.ts                       # Punto de entrada
├── app.module.ts                 # Módulo raíz
├── common/                       # Utilidades compartidas
│   ├── decorators/              # Decoradores personalizados
│   ├── dto/                     # DTOs globales
│   ├── exceptions/               # Excepciones personalizadas
│   ├── filters/                  # Filtros de errores
│   ├── guards/                   # Guards de autenticación
│   ├── interceptors/             # Interceptores
│   └── utils/                    # Utilidades
├── config/                       # Configuración
│   ├── app.config.ts            # Configuración general
│   ├── database.config.ts       # Configuración de BD
│   ├── jwt.config.ts            # Configuración JWT
│   └── swagger.config.ts        # Configuración Swagger
├── database/                     # Base de datos
│   ├── entities/                # Entidades TypeORM
│   ├── migrations/              # Migraciones
│   └── seeds/                   # Datos iniciales
└── modules/                      # Módulos principales
    ├── auth/                    # Autenticación
    ├── users/                   # Gestión de usuarios
    ├── tickets/                 # Gestión de tickets
    ├── comments/                # Comentarios
    ├── categories/              # Categorías
    ├── priorities/              # Prioridades
    ├── statuses/                # Estados
    ├── reports/                 # Reportes
    └── notifications/           # Notificaciones
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+
- Yarn
- PostgreSQL (Supabase)

### Pasos de instalación

1. **Instalar dependencias**
```bash
yarn install
```

2. **Configurar variables de entorno**
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

3. **Ejecutar migraciones**
```bash
# Ejecutar migraciones en Supabase SQL Editor
# Ver database/migrations/001_initial_schema.sql
# Ver database/policies/rls_policies.sql
```

4. **Ejecutar en desarrollo**
```bash
yarn dev
```

## 🔧 Configuración

### Variables de entorno

```env
# Aplicación
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/axia_ti

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

## 📚 API Endpoints

### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `POST /auth/refresh` - Renovar token
- `GET /auth/profile` - Perfil del usuario
- `POST /auth/logout` - Cerrar sesión

### Usuarios
- `GET /users` - Lista de usuarios
- `GET /users/:id` - Usuario por ID
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Tickets
- `GET /tickets` - Lista de tickets
- `GET /tickets/:id` - Ticket por ID
- `POST /tickets` - Crear ticket
- `PATCH /tickets/:id` - Actualizar ticket
- `PATCH /tickets/:id/assign` - Asignar ticket
- `PATCH /tickets/:id/status` - Cambiar estado
- `DELETE /tickets/:id` - Eliminar ticket
- `GET /tickets/dashboard` - Métricas del dashboard

### Comentarios
- `GET /comments` - Lista de comentarios
- `GET /comments/:id` - Comentario por ID
- `POST /comments` - Crear comentario
- `PATCH /comments/:id` - Actualizar comentario
- `DELETE /comments/:id` - Eliminar comentario

## 🔐 Autenticación

El sistema utiliza **JWT** con refresh tokens:

1. **Login**: Devuelve access token y refresh token
2. **Access Token**: Válido por 24 horas
3. **Refresh Token**: Válido por 7 días
4. **Renovación**: Usar refresh token para obtener nuevo access token

### Headers requeridos

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

## 📖 Documentación

La documentación de la API está disponible en:
- **Swagger UI**: `http://localhost:3001/api/docs`
- **JSON Schema**: `http://localhost:3001/api/docs-json`

## 🧪 Testing

```bash
# Tests unitarios
yarn test

# Tests e2e
yarn test:e2e

# Coverage
yarn test:cov
```

## 🚀 Despliegue

### Producción

```bash
# Build
yarn build

# Start
yarn start
```


## 📝 Scripts disponibles

- `yarn start` - Ejecutar en producción
- `yarn dev` - Ejecutar en desarrollo
- `yarn start:debug` - Ejecutar en modo debug
- `yarn build` - Compilar TypeScript
- `yarn lint` - Ejecutar ESLint
- `yarn format` - Formatear código con Prettier
- `yarn test` - Ejecutar tests

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**AxiaTI Backend** - API robusta para gestión de tickets de soporte TI 🚀
