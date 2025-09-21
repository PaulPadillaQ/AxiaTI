-- Políticas de Row Level Security (RLS) para AxiaTI
-- Ejecutar este archivo en Supabase SQL Editor después de crear las tablas

-- Habilitar RLS en las tablas
ALTER TABLE "AxiaTI"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AxiaTI"."tickets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AxiaTI"."comments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AxiaTI"."notifications" ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can view their own data" ON "AxiaTI"."users"
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON "AxiaTI"."users"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Technicians can view all users" ON "AxiaTI"."users"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'technician'
        )
    );

CREATE POLICY "Users can update their own data" ON "AxiaTI"."users"
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update all users" ON "AxiaTI"."users"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can insert users" ON "AxiaTI"."users"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete users" ON "AxiaTI"."users"
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas para tickets
CREATE POLICY "Users can view their own tickets" ON "AxiaTI"."tickets"
    FOR SELECT USING (created_by = auth.uid());

CREATE POLICY "Assigned users can view assigned tickets" ON "AxiaTI"."tickets"
    FOR SELECT USING (assigned_to = auth.uid());

CREATE POLICY "Technicians can view all tickets" ON "AxiaTI"."tickets"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role IN ('technician', 'admin')
        )
    );

CREATE POLICY "Users can create tickets" ON "AxiaTI"."tickets"
    FOR INSERT WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own tickets" ON "AxiaTI"."tickets"
    FOR UPDATE USING (created_by = auth.uid());

CREATE POLICY "Assigned users can update assigned tickets" ON "AxiaTI"."tickets"
    FOR UPDATE USING (assigned_to = auth.uid());

CREATE POLICY "Technicians can update all tickets" ON "AxiaTI"."tickets"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role IN ('technician', 'admin')
        )
    );

CREATE POLICY "Admins can delete tickets" ON "AxiaTI"."tickets"
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas para comentarios
CREATE POLICY "Users can view comments on their tickets" ON "AxiaTI"."comments"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."tickets" 
            WHERE id = ticket_id AND (created_by = auth.uid() OR assigned_to = auth.uid())
        )
    );

CREATE POLICY "Technicians can view all comments" ON "AxiaTI"."comments"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role IN ('technician', 'admin')
        )
    );

CREATE POLICY "Users can create comments on their tickets" ON "AxiaTI"."comments"
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM "AxiaTI"."tickets" 
            WHERE id = ticket_id AND (created_by = auth.uid() OR assigned_to = auth.uid())
        )
    );

CREATE POLICY "Technicians can create comments on any ticket" ON "AxiaTI"."comments"
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role IN ('technician', 'admin')
        )
    );

CREATE POLICY "Users can update their own comments" ON "AxiaTI"."comments"
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON "AxiaTI"."comments"
    FOR DELETE USING (user_id = auth.uid());

-- Políticas para notificaciones
CREATE POLICY "Users can view their own notifications" ON "AxiaTI"."notifications"
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON "AxiaTI"."notifications"
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON "AxiaTI"."notifications"
    FOR INSERT WITH CHECK (true);

-- Políticas para categorías (lectura pública)
CREATE POLICY "Everyone can view categories" ON "AxiaTI"."categories"
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON "AxiaTI"."categories"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas para prioridades (lectura pública)
CREATE POLICY "Everyone can view priorities" ON "AxiaTI"."priorities"
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage priorities" ON "AxiaTI"."priorities"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Políticas para estados (lectura pública)
CREATE POLICY "Everyone can view statuses" ON "AxiaTI"."statuses"
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage statuses" ON "AxiaTI"."statuses"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "AxiaTI"."users" 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
