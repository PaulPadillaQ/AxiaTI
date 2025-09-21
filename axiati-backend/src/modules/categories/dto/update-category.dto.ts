import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Hardware',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Problemas relacionados con hardware de computadoras',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
