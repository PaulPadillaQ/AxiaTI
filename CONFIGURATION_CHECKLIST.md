# 🎫 AxiaTI - Configuración de Credenciales

## 📋 Checklist de configuración

### ✅ Pasos completados automáticamente:
- [x] Estructura de proyecto creada
- [x] Archivos de configuración generados
- [x] Scripts de setup creados

### 🔧 Pasos manuales requeridos:

#### 1. Crear proyecto en Supabase
- [ ] Ir a [supabase.com](https://supabase.com)
- [ ] Crear nueva cuenta o iniciar sesión
- [ ] Crear nuevo proyecto
- [ ] Anotar las credenciales del proyecto

#### 2. Configurar variables de entorno del Backend
- [ ] Copiar `axiati-backend/env.local` a `axiati-backend/.env`
- [ ] Editar `axiati-backend/.env` con credenciales reales:
  - [ ] `SUPABASE_URL=https://[TU_PROJECT_REF].supabase.co`
  - [ ] `SUPABASE_ANON_KEY=tu-supabase-anon-key`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY=tu-supabase-service-role-key`
  - [ ] `DATABASE_URL=postgresql://postgres:[TU_PASSWORD]@db.[TU_PROJECT_REF].supabase.co:5432/postgres`
  - [ ] `JWT_SECRET=tu-super-secret-jwt-key-unico`
  - [ ] `JWT_REFRESH_SECRET=tu-super-secret-refresh-key-unico`

#### 3. Configurar variables de entorno del Frontend
- [ ] Copiar `frontend/env.local` a `frontend/.env.local`
- [ ] Editar `frontend/.env.local` con credenciales reales:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL=https://[TU_PROJECT_REF].supabase.co`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key`
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:3001`

#### 4. Ejecutar migraciones de base de datos
- [ ] Ir al SQL Editor en Supabase
- [ ] Ejecutar `database/migrations/001_initial_schema.sql`
- [ ] Ejecutar `database/policies/rls_policies.sql`

#### 5. Configurar OpenAI (Opcional)
- [ ] Ir a [platform.openai.com](https://platform.openai.com)
- [ ] Crear cuenta o iniciar sesión
- [ ] Crear nueva clave API
- [ ] Agregar `OPENAI_API_KEY=tu-openai-api-key` a los archivos .env

#### 6. Verificar configuración
- [ ] Ejecutar backend: `cd axiati-backend && npm run start:dev`
- [ ] Ejecutar frontend: `cd frontend && npm run dev`
- [ ] Verificar que no hay errores de conexión

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

## 🚀 Comandos útiles

### Configuración inicial:
```bash
# Windows PowerShell
.\setup.ps1

# Linux/Mac
chmod +x setup.sh
./setup.sh
```

### Desarrollo:
```bash
# Backend
cd axiati-backend
yarn dev

# Frontend
cd frontend
yarn dev
```

### Producción:
```bash
# Build
cd axiati-backend && yarn build
cd frontend && yarn build

# Start
cd axiati-backend && yarn start
cd frontend && yarn start
```

## 🆘 Troubleshooting

### Problemas comunes:

1. **Error de conexión a Supabase**:
   - Verificar que la URL sea correcta
   - Verificar que las claves sean válidas
   - Verificar que el proyecto esté activo

2. **Error de base de datos**:
   - Verificar que la contraseña sea correcta
   - Verificar que el schema `AxiaTI` exista
   - Verificar que las migraciones se hayan ejecutado

3. **Error de JWT**:
   - Verificar que las claves JWT sean únicas
   - Verificar que no contengan caracteres especiales

4. **Error de CORS**:
   - Verificar que las URLs en `CORS_ORIGINS` sean correctas
   - Verificar que el frontend y backend estén en los puertos correctos

## 📞 Soporte

Si tienes problemas:
1. Revisa este checklist
2. Consulta `SETUP_CREDENTIALS.md` para más detalles
3. Revisa los logs del backend y frontend
4. Verifica que todas las credenciales sean correctas
