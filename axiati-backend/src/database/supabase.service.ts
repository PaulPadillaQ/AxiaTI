import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(url: string, serviceRoleKey: string) {
    this.supabase = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Métodos específicos para el schema AxiaTI
  async getUsers() {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getUserById(id: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async getUserByEmail(email: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createUser(userData: any) {
    const { data, error } = await this.supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateUser(id: string, userData: any) {
    const { data, error } = await this.supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteUser(id: string) {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { message: 'Usuario eliminado exitosamente' };
  }

  // Métodos para tickets
  async getTickets(filters?: any) {
    let query = this.supabase
      .from('tickets')
      .select(`
        *,
        users!tickets_created_by_fkey(id, first_name, last_name, email),
        users!tickets_assigned_to_fkey(id, first_name, last_name, email),
        categories(id, name, description),
        priorities(id, name, level),
        statuses(id, name, description)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status_id', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority_id', filters.priority);
    }
    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }
    if (filters?.assignedTo) {
      query = query.eq('assigned_to', filters.assignedTo);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  async getTicketById(id: string) {
    const { data, error } = await this.supabase
      .from('tickets')
      .select(`
        *,
        users!tickets_created_by_fkey(id, first_name, last_name, email),
        users!tickets_assigned_to_fkey(id, first_name, last_name, email),
        categories(id, name, description),
        priorities(id, name, level),
        statuses(id, name, description)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createTicket(ticketData: any) {
    const { data, error } = await this.supabase
      .from('tickets')
      .insert(ticketData)
      .select(`
        *,
        users!tickets_created_by_fkey(id, first_name, last_name, email),
        users!tickets_assigned_to_fkey(id, first_name, last_name, email),
        categories(id, name, description),
        priorities(id, name, level),
        statuses(id, name, description)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateTicket(id: string, ticketData: any) {
    const { data, error } = await this.supabase
      .from('tickets')
      .update(ticketData)
      .eq('id', id)
      .select(`
        *,
        users!tickets_created_by_fkey(id, first_name, last_name, email),
        users!tickets_assigned_to_fkey(id, first_name, last_name, email),
        categories(id, name, description),
        priorities(id, name, level),
        statuses(id, name, description)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteTicket(id: string) {
    const { error } = await this.supabase
      .from('tickets')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { message: 'Ticket eliminado exitosamente' };
  }

  // Métodos para comentarios
  async getCommentsByTicketId(ticketId: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .select(`
        *,
        users(id, first_name, last_name, email)
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async createComment(commentData: any) {
    const { data, error } = await this.supabase
      .from('comments')
      .insert(commentData)
      .select(`
        *,
        users(id, first_name, last_name, email)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Métodos para categorías
  async getCategories() {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async createCategory(categoryData: any) {
    const { data, error } = await this.supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Métodos para prioridades
  async getPriorities() {
    const { data, error } = await this.supabase
      .from('priorities')
      .select('*')
      .order('level', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Métodos para estados
  async getStatuses() {
    const { data, error } = await this.supabase
      .from('statuses')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Métodos para reportes y métricas
  async getDashboardMetrics(userId?: string, userRole?: string) {
    const baseQuery = this.supabase.from('tickets').select('*');
    
    const [totalTickets, openTickets, inProgressTickets, closedTickets, highPriorityTickets] = await Promise.all([
      baseQuery,
      baseQuery.eq('status_id', 'open'),
      baseQuery.eq('status_id', 'in_progress'),
      baseQuery.eq('status_id', 'closed'),
      baseQuery.eq('priority_id', 'high'),
    ]);

    let myTickets = { count: 0 };
    let assignedTickets = { count: 0 };

    if (userId) {
      if (userRole === 'user') {
        myTickets = await baseQuery.eq('created_by', userId);
      } else if (userRole === 'technician') {
        assignedTickets = await baseQuery.eq('assigned_to', userId);
      }
    }

    return {
      totalTickets: totalTickets.count || 0,
      openTickets: openTickets.count || 0,
      inProgressTickets: inProgressTickets.count || 0,
      closedTickets: closedTickets.count || 0,
      highPriorityTickets: highPriorityTickets.count || 0,
      myTickets: myTickets.count || 0,
      assignedTickets: assignedTickets.count || 0,
    };
  }
}

