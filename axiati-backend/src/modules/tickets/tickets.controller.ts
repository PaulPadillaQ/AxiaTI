import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Tickets')
@Controller('tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo ticket' })
  @ApiResponse({ status: 201, description: 'Ticket creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de ticket inválidos' })
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.create(createTicketDto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de tickets' })
  @ApiResponse({ status: 200, description: 'Lista de tickets obtenida exitosamente' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('category') category?: string,
    @Query('assignedTo') assignedTo?: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.findAll({
      page,
      limit,
      status,
      priority,
      category,
      assignedTo,
      userRole: user.role,
      userId: user.sub,
    });
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtener métricas del dashboard' })
  @ApiResponse({ status: 200, description: 'Métricas obtenidas exitosamente' })
  async getDashboard(@CurrentUser() user: any) {
    return this.ticketsService.getDashboard(user.sub, user.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener ticket por ID' })
  @ApiResponse({ status: 200, description: 'Ticket obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ticketsService.findOne(id, user.sub, user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar ticket' })
  @ApiResponse({ status: 200, description: 'Ticket actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.update(id, updateTicketDto, user.sub, user.role);
  }

  @Patch(':id/assign')
  @Roles(Role.ADMIN, Role.TECHNICIAN)
  @ApiOperation({ summary: 'Asignar ticket a técnico' })
  @ApiResponse({ status: 200, description: 'Ticket asignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  async assignTicket(
    @Param('id') id: string,
    @Body('assignedTo') assignedTo: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.assignTicket(id, assignedTo, user.sub);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cambiar estado del ticket' })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  async changeStatus(
    @Param('id') id: string,
    @Body('statusId') statusId: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.changeStatus(id, statusId, user.sub, user.role);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar ticket' })
  @ApiResponse({ status: 200, description: 'Ticket eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ticket no encontrado' })
  async remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
