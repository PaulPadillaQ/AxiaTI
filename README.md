# 🎫 AxiaTI - Sistema de Gestión de Tickets de Soporte TI

**AxiaTI** es una aplicación web completa para la **gestión de tickets de soporte TI**, diseñada para organizaciones que necesitan administrar **solicitudes de ayuda, seguimiento y resolución de problemas** de forma centralizada.

## 🚀 Características principales

- ✅ **Gestión completa de tickets** - Creación, asignación, seguimiento y resolución
- ✅ **Autenticación segura** - JWT + Supabase Auth
- ✅ **Dashboard inteligente** - Métricas y alertas en tiempo real
- ✅ **IA integrada** - Categorización automática y sugerencias de solución
- ✅ **Responsive design** - Optimizado para PC y dispositivos móviles Android
- ✅ **Dark mode** - Interfaz adaptable con personalización visual

## 🛠️ Stack tecnológico

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Shadcn/ui** - Componentes UI modernos
- **React Hook Form** - Manejo de formularios
- **Zustand** - Estado global

### Backend
- **NestJS** - Framework Node.js escalable
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **JWT** - Autenticación con tokens
- **Class Validator** - Validación de datos
- **Swagger** - Documentación de API

### Base de Datos
- **Supabase** - PostgreSQL en la nube
- **Row Level Security (RLS)** - Seguridad a nivel de fila
- **Auth nativo** - Autenticación integrada

### IA y Automatización
- **OpenAI API** - Categorización y sugerencias inteligentes
- **Asistente virtual** - Soporte técnico automatizado

### Despliegue
- **Vercel** - Frontend (Next.js)
- **Supabase** - Backend y base de datos
- **GitHub Actions** - CI/CD

## 📁 Estructura del proyecto

```
axia-ti/
├── frontend/          # Aplicación Next.js
├── axiati-backend/    # API NestJS
├── database/          # Esquemas y migraciones
├── docs/             # Documentación técnica
├── .github/          # Workflows de CI/CD
└── README.md         # Este archivo
```

## 🚀 Inicio rápido

### Prerrequisitos
- Node.js 18+
- Yarn
- Cuenta de Supabase
- Cuenta de OpenAI (opcional)

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd axia-ti
```

2. **Configuración automática**
```bash
# Linux/Mac
chmod +x setup.sh
./setup.sh

# Windows PowerShell
.\setup.ps1
```

3. **Configurar credenciales**
```bash
# Editar archivos de configuración
# Backend
cp axiati-backend/env.local axiati-backend/.env
# Editar axiati-backend/.env con tus credenciales

# Frontend  
cp frontend/env.local frontend/.env.local
# Editar frontend/.env.local con tus credenciales
```

4. **Configurar base de datos**
```bash
# Ejecutar migraciones en Supabase SQL Editor
# Ver database/migrations/001_initial_schema.sql
# Ver database/policies/rls_policies.sql
```

5. **Ejecutar en desarrollo**
```bash
# Terminal 1 - Backend
cd axiati-backend
yarn dev

# Terminal 2 - Frontend
cd frontend
yarn dev
```

## 🔧 Configuración

### Variables de entorno

#### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (.env)
```env
DATABASE_URL=your_supabase_database_url
DB_SCHEMA=AxiaTI
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 📚 Documentación

- [Configuración de credenciales](./SETUP_CREDENTIALS.md) - Guía completa para configurar Supabase
- [Guía de instalación](./docs/installation.md)
- [Arquitectura del sistema](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Guía de despliegue](./docs/deployment.md)
- [Contribución](./docs/contributing.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollador Principal** - Arquitectura y desarrollo full-stack
- **Diseñador UX/UI** - Interfaz y experiencia de usuario

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, puedes:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación técnica

---

**AxiaTI** - Simplificando la gestión de soporte técnico con tecnología moderna 🚀
