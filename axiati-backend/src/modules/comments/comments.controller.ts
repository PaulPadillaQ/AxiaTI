import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado exitosamente' })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de comentarios' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios obtenida exitosamente' })
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario obtenido exitosamente' })
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar comentario' })
  @ApiResponse({ status: 200, description: 'Comentario actualizado exitosamente' })
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar comentario' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado exitosamente' })
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
