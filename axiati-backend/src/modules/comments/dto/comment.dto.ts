import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'He revisado el problema y encontré la causa...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'ID del ticket al que pertenece el comentario',
    example: 'uuid-ticket-id',
  })
  @IsUUID()
  ticketId: string;

  @ApiProperty({
    description: 'ID del usuario que crea el comentario',
    example: 'uuid-user-id',
  })
  @IsUUID()
  userId: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'He revisado el problema y encontré la causa...',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
