# 🔐 Archivos de configuración de credenciales

## ⚠️ IMPORTANTE: Archivos que NO deben subirse al repositorio

Los siguientes archivos contienen credenciales sensibles y están excluidos del repositorio:

### Backend:
- `axiati-backend/.env` - Variables de entorno del backend
- `axiati-backend/.env.local` - Variables locales del backend
- `axiati-backend/.env.development` - Variables de desarrollo
- `axiati-backend/.env.production` - Variables de producción

### Frontend:
- `frontend/.env.local` - Variables locales del frontend
- `frontend/.env.development` - Variables de desarrollo
- `frontend/.env.production` - Variables de producción

## 📋 Cómo crear estos archivos:

### 1. Backend
```bash
cd axiati-backend
cp env.example .env
# Editar .env con tus credenciales reales
```

### 2. Frontend
```bash
cd frontend
cp env.local .env.local
# Editar .env.local con tus credenciales reales
```

## 🔒 Seguridad

- **NUNCA** subas archivos `.env` al repositorio
- **NUNCA** compartas tus claves de servicio
- **SIEMPRE** usa variables de entorno en producción
- **ROTA** las claves regularmente

## 📚 Más información

Consulta [SETUP_CREDENTIALS.md](./SETUP_CREDENTIALS.md) para la guía completa de configuración.
