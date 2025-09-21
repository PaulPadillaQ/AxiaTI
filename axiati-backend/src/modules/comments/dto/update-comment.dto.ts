import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
