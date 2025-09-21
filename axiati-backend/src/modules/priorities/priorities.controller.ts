import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrioritiesService } from './priorities.service';

@ApiTags('Priorities')
@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las prioridades' })
  @ApiResponse({ status: 200, description: 'Lista de prioridades' })
  findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una prioridad por ID' })
  @ApiResponse({ status: 200, description: 'Prioridad encontrada' })
  findOne(@Param('id') id: string) {
    return this.prioritiesService.findOne(id);
  }
}
