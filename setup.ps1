# Script de configuración para AxiaTI (Windows PowerShell)
# Este script ayuda a configurar las variables de entorno

Write-Host "🎫 Configurando AxiaTI..." -ForegroundColor Green
Write-Host ""

# Función para mostrar mensajes
function Show-Message {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Show-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Show-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Show-Info {
    param($Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Show-Message "Node.js está instalado: $nodeVersion"
} catch {
    Show-Error "Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
}

# Verificar si yarn está instalado
try {
    $yarnVersion = yarn --version
    Show-Message "Yarn está instalado: $yarnVersion"
} catch {
    Show-Error "Yarn no está instalado. Por favor instala Yarn primero."
    exit 1
}

# Crear archivos .env si no existen
if (-not (Test-Path "axiati-backend\.env")) {
    Show-Info "Creando archivo .env para el backend..."
    Copy-Item "axiati-backend\env.local" "axiati-backend\.env"
    Show-Message "Archivo .env creado para el backend"
} else {
    Show-Warning "El archivo .env ya existe en el backend"
}

if (-not (Test-Path "frontend\.env.local")) {
    Show-Info "Creando archivo .env.local para el frontend..."
    Copy-Item "frontend\env.local" "frontend\.env.local"
    Show-Message "Archivo .env.local creado para el frontend"
} else {
    Show-Warning "El archivo .env.local ya existe en el frontend"
}

# Instalar dependencias del backend
Show-Info "Instalando dependencias del backend..."
Set-Location "axiati-backend"
try {
    yarn install
    Show-Message "Dependencias del backend instaladas"
} catch {
    Show-Error "Error instalando dependencias del backend"
    Set-Location ".."
    exit 1
}
Set-Location ".."

# Instalar dependencias del frontend
Show-Info "Instalando dependencias del frontend..."
Set-Location "frontend"
try {
    yarn install
    Show-Message "Dependencias del frontend instaladas"
} catch {
    Show-Error "Error instalando dependencias del frontend"
    Set-Location ".."
    exit 1
}
Set-Location ".."

Write-Host ""
Show-Message "Configuración inicial completada!"
Write-Host ""
Show-Warning "IMPORTANTE: Ahora necesitas configurar tus credenciales:"
Write-Host ""
Show-Info "1. Edita axiati-backend\.env con tus credenciales de Supabase"
Show-Info "2. Edita frontend\.env.local con tus credenciales de Supabase"
Show-Info "3. Ejecuta las migraciones en Supabase SQL Editor"
Write-Host ""
Show-Info "Para más información, consulta SETUP_CREDENTIALS.md"
Write-Host ""
Show-Info "Para ejecutar el proyecto:"
Write-Host "  Backend:  cd axiati-backend && yarn dev"
Write-Host "  Frontend: cd frontend && yarn dev"
Write-Host ""
