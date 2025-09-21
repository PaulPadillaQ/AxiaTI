import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de tickets' })
  @ApiResponse({ status: 200, description: 'Estadísticas de tickets' })
  getTicketStats() {
    return this.reportsService.getTicketStats();
  }

  @Get('by-category')
  @ApiOperation({ summary: 'Obtener tickets por categoría' })
  @ApiResponse({ status: 200, description: 'Tickets agrupados por categoría' })
  getTicketsByCategory() {
    return this.reportsService.getTicketsByCategory();
  }

  @Get('by-priority')
  @ApiOperation({ summary: 'Obtener tickets por prioridad' })
  @ApiResponse({ status: 200, description: 'Tickets agrupados por prioridad' })
  getTicketsByPriority() {
    return this.reportsService.getTicketsByPriority();
  }
}
