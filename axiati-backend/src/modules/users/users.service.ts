import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.supabaseService.createUser(createUserDto);
      return user;
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('El usuario ya existe');
      }
      throw error;
    }
  }

  async findAll(options: { page: number; limit: number; search?: string }) {
    try {
      const users = await this.supabaseService.getUsers();
      
      // Aplicar filtros de búsqueda si se proporcionan
      let filteredUsers = users;
      if (options.search) {
        filteredUsers = users.filter(user => 
          user.first_name.toLowerCase().includes(options.search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(options.search.toLowerCase()) ||
          user.email.toLowerCase().includes(options.search.toLowerCase())
        );
      }

      // Aplicar paginación
      const startIndex = (options.page - 1) * options.limit;
      const endIndex = startIndex + options.limit;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      return {
        data: paginatedUsers,
        total: filteredUsers.length,
        page: options.page,
        limit: options.limit,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const user = await this.supabaseService.getUserById(id);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      if (error.code === 'PGRST116') { // No rows returned
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.supabaseService.getUserByEmail(email);
      return user;
    } catch (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.supabaseService.updateUser(id, updateUserDto);
      return user;
    } catch (error) {
      if (error.code === 'PGRST116') { // No rows returned
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.supabaseService.deleteUser(id);
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      if (error.code === 'PGRST116') { // No rows returned
        throw new NotFoundException('Usuario no encontrado');
      }
      throw error;
    }
  }
}
