import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketPriority } from '../tickets/dto/ticket.dto';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Título del ticket',
    example: 'Problema con el sistema de correo',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del problema',
    example: 'El sistema de correo no está funcionando correctamente desde ayer',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID de la categoría del ticket',
    example: 'uuid-category-id',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'Prioridad del ticket',
    enum: TicketPriority,
    example: TicketPriority.MEDIUM,
  })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @ApiProperty({
    description: 'ID del usuario asignado (opcional)',
    example: 'uuid-user-id',
    required: false,
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiProperty({
    description: 'Archivos adjuntos (opcional)',
    example: ['archivo1.pdf', 'imagen1.png'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}

export class UpdateTicketDto {
  @ApiProperty({
    description: 'Título del ticket',
    example: 'Problema con el sistema de correo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    description: 'Descripción detallada del problema',
    example: 'El sistema de correo no está funcionando correctamente desde ayer',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'ID de la categoría del ticket',
    example: 'uuid-category-id',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryId?: string;

  @ApiProperty({
    description: 'Prioridad del ticket',
    enum: TicketPriority,
    example: TicketPriority.HIGH,
    required: false,
  })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @ApiProperty({
    description: 'ID del usuario asignado',
    example: 'uuid-user-id',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  assignedTo?: string;

  @ApiProperty({
    description: 'Archivos adjuntos',
    example: ['archivo1.pdf', 'imagen1.png'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  attachments?: string[];
}
