#!/bin/bash

# Script de configuración para AxiaTI
# Este script ayuda a configurar las variables de entorno

echo "🎫 Configurando AxiaTI..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
show_message() {
    echo -e "${GREEN}✅ $1${NC}"
}

show_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

show_error() {
    echo -e "${RED}❌ $1${NC}"
}

show_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    show_error "Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

# Verificar si yarn está instalado
if ! command -v yarn &> /dev/null; then
    show_error "Yarn no está instalado. Por favor instala Yarn primero."
    exit 1
fi

show_message "Node.js y Yarn están instalados"

# Crear archivos .env si no existen
if [ ! -f "axiati-backend/.env" ]; then
    show_info "Creando archivo .env para el backend..."
    cp axiati-backend/env.local axiati-backend/.env
    show_message "Archivo .env creado para el backend"
else
    show_warning "El archivo .env ya existe en el backend"
fi

if [ ! -f "frontend/.env.local" ]; then
    show_info "Creando archivo .env.local para el frontend..."
    cp frontend/env.local frontend/.env.local
    show_message "Archivo .env.local creado para el frontend"
else
    show_warning "El archivo .env.local ya existe en el frontend"
fi

# Instalar dependencias del backend
show_info "Instalando dependencias del backend..."
cd axiati-backend
if yarn install; then
    show_message "Dependencias del backend instaladas"
else
    show_error "Error instalando dependencias del backend"
    exit 1
fi
cd ..

# Instalar dependencias del frontend
show_info "Instalando dependencias del frontend..."
cd frontend
if yarn install; then
    show_message "Dependencias del frontend instaladas"
else
    show_error "Error instalando dependencias del frontend"
    exit 1
fi
cd ..

echo ""
show_message "Configuración inicial completada!"
echo ""
show_warning "IMPORTANTE: Ahora necesitas configurar tus credenciales:"
echo ""
show_info "1. Edita axiati-backend/.env con tus credenciales de Supabase"
show_info "2. Edita frontend/.env.local con tus credenciales de Supabase"
show_info "3. Ejecuta las migraciones en Supabase SQL Editor"
echo ""
show_info "Para más información, consulta SETUP_CREDENTIALS.md"
echo ""
show_info "Para ejecutar el proyecto:"
echo "  Backend:  cd axiati-backend && yarn dev"
echo "  Frontend: cd frontend && yarn dev"
echo ""
