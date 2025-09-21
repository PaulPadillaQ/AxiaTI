-- Migración inicial para AxiaTI
-- Ejecutar este archivo en Supabase SQL Editor

-- Crear el schema AxiaTI
CREATE SCHEMA IF NOT EXISTS "AxiaTI";

-- Configurar el schema por defecto
SET search_path TO "AxiaTI", public;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS "AxiaTI"."users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'technician', 'user')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS "AxiaTI"."categories" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de prioridades
CREATE TABLE IF NOT EXISTS "AxiaTI"."priorities" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    level INTEGER NOT NULL UNIQUE CHECK (level BETWEEN 1 AND 5),
    color VARCHAR(7) DEFAULT '#3B82F6',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de estados
CREATE TABLE IF NOT EXISTS "AxiaTI"."statuses" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    order INTEGER NOT NULL,
    color VARCHAR(7) DEFAULT '#6B7280',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de tickets
CREATE TABLE IF NOT EXISTS "AxiaTI"."tickets" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES "AxiaTI"."categories"(id) ON DELETE SET NULL,
    priority_id UUID REFERENCES "AxiaTI"."priorities"(id) ON DELETE SET NULL,
    status_id UUID REFERENCES "AxiaTI"."statuses"(id) ON DELETE SET NULL,
    created_by UUID REFERENCES "AxiaTI"."users"(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES "AxiaTI"."users"(id) ON DELETE SET NULL,
    attachments JSONB DEFAULT '[]',
    resolution TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS "AxiaTI"."comments" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID REFERENCES "AxiaTI"."tickets"(id) ON DELETE CASCADE,
    user_id UUID REFERENCES "AxiaTI"."users"(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS "AxiaTI"."notifications" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "AxiaTI"."users"(id) ON DELETE CASCADE,
    ticket_id UUID REFERENCES "AxiaTI"."tickets"(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_tickets_created_by ON "AxiaTI"."tickets"(created_by);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON "AxiaTI"."tickets"(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON "AxiaTI"."tickets"(status_id);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON "AxiaTI"."tickets"(priority_id);
CREATE INDEX IF NOT EXISTS idx_tickets_category ON "AxiaTI"."tickets"(category_id);
CREATE INDEX IF NOT EXISTS idx_comments_ticket ON "AxiaTI"."comments"(ticket_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON "AxiaTI"."comments"(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON "AxiaTI"."notifications"(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_ticket ON "AxiaTI"."notifications"(ticket_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION "AxiaTI".update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "AxiaTI"."users" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON "AxiaTI"."categories" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();
CREATE TRIGGER update_priorities_updated_at BEFORE UPDATE ON "AxiaTI"."priorities" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();
CREATE TRIGGER update_statuses_updated_at BEFORE UPDATE ON "AxiaTI"."statuses" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON "AxiaTI"."tickets" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON "AxiaTI"."comments" FOR EACH ROW EXECUTE FUNCTION "AxiaTI".update_updated_at_column();

-- Datos iniciales
INSERT INTO "AxiaTI"."priorities" (name, level, color) VALUES
('Baja', 1, '#10B981'),
('Media', 2, '#F59E0B'),
('Alta', 3, '#EF4444'),
('Crítica', 4, '#DC2626'),
('Urgente', 5, '#991B1B')
ON CONFLICT (level) DO NOTHING;

INSERT INTO "AxiaTI"."statuses" (name, description, "order", color) VALUES
('Abierto', 'Ticket recién creado', 1, '#3B82F6'),
('En Progreso', 'Ticket siendo trabajado', 2, '#F59E0B'),
('Pendiente', 'Esperando información del usuario', 3, '#8B5CF6'),
('Resuelto', 'Problema solucionado', 4, '#10B981'),
('Cerrado', 'Ticket cerrado', 5, '#6B7280')
ON CONFLICT (name) DO NOTHING;

INSERT INTO "AxiaTI"."categories" (name, description) VALUES
('Hardware', 'Problemas relacionados con hardware de computadoras'),
('Software', 'Problemas con aplicaciones y software'),
('Red', 'Problemas de conectividad y red'),
('Email', 'Problemas con correo electrónico'),
('Impresoras', 'Problemas con impresoras y dispositivos de impresión'),
('Seguridad', 'Problemas de seguridad y acceso'),
('Otros', 'Otros problemas no categorizados')
ON CONFLICT (name) DO NOTHING;
