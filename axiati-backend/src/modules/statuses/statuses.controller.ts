import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatusesService } from './statuses.service';

@ApiTags('Statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados' })
  findAll() {
    return this.statusesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado por ID' })
  @ApiResponse({ status: 200, description: 'Estado encontrado' })
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(id);
  }
}
