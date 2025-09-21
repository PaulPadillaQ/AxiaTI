# Configuración de Supabase para AxiaTI

## 🚀 Setup inicial

### 1. Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Configura la región más cercana
5. Anota las credenciales del proyecto

### 2. Configurar variables de entorno
Copia el archivo `env.example` a `.env` y configura:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Base de datos
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/[database]
DB_SCHEMA=AxiaTI
DB_SSL=true
```

### 3. Ejecutar migraciones
1. Ve al SQL Editor en Supabase
2. Ejecuta el archivo `database/migrations/001_initial_schema.sql`
3. Ejecuta el archivo `database/policies/rls_policies.sql`

### 4. Configurar autenticación
1. Ve a Authentication > Settings
2. Configura los providers que necesites
3. Configura las URLs de redirección

## 📊 Estructura de la base de datos

### Schema: AxiaTI

#### Tablas principales:
- **users** - Usuarios del sistema
- **tickets** - Tickets de soporte
- **comments** - Comentarios en tickets
- **categories** - Categorías de tickets
- **priorities** - Prioridades de tickets
- **statuses** - Estados de tickets
- **notifications** - Notificaciones

#### Relaciones:
- `tickets.created_by` → `users.id`
- `tickets.assigned_to` → `users.id`
- `tickets.category_id` → `categories.id`
- `tickets.priority_id` → `priorities.id`
- `tickets.status_id` → `statuses.id`
- `comments.ticket_id` → `tickets.id`
- `comments.user_id` → `users.id`
- `notifications.user_id` → `users.id`
- `notifications.ticket_id` → `tickets.id`

## 🔐 Seguridad (RLS)

### Políticas implementadas:
- **Usuarios**: Solo pueden ver/editar sus propios datos
- **Tickets**: Los usuarios ven sus tickets, los técnicos ven todos
- **Comentarios**: Solo en tickets donde participan
- **Notificaciones**: Solo las propias
- **Categorías/Prioridades/Estados**: Lectura pública

### Roles:
- **admin**: Acceso completo
- **technician**: Puede ver todos los tickets y comentarios
- **user**: Solo sus propios tickets y comentarios

## 🛠️ Comandos útiles

### Conectar a la base de datos:
```bash
# Usando psql
psql "postgresql://postgres:[password]@[host]:5432/[database]"

# Usando Supabase CLI
supabase db reset
supabase db push
```

### Verificar conexión:
```bash
# Desde el backend
npm run start:dev
# Verificar logs de conexión
```

## 📈 Monitoreo

### Métricas importantes:
- Número de tickets por estado
- Tiempo promedio de resolución
- Tickets por técnico
- Categorías más comunes

### Queries útiles:
```sql
-- Tickets por estado
SELECT s.name, COUNT(*) as count
FROM "AxiaTI"."tickets" t
JOIN "AxiaTI"."statuses" s ON t.status_id = s.id
GROUP BY s.name, s.order
ORDER BY s.order;

-- Tickets por técnico
SELECT u.first_name, u.last_name, COUNT(*) as assigned_tickets
FROM "AxiaTI"."tickets" t
JOIN "AxiaTI"."users" u ON t.assigned_to = u.id
WHERE t.status_id != 'closed'
GROUP BY u.id, u.first_name, u.last_name
ORDER BY assigned_tickets DESC;
```

## 🔧 Troubleshooting

### Problemas comunes:
1. **Error de conexión**: Verificar DATABASE_URL y SSL
2. **RLS bloqueando queries**: Verificar políticas
3. **Schema no encontrado**: Verificar DB_SCHEMA=AxiaTI
4. **Permisos insuficientes**: Usar service_role_key para operaciones admin

### Logs útiles:
```bash
# Ver logs de Supabase
supabase logs

# Ver logs del backend
npm run start:dev
```
