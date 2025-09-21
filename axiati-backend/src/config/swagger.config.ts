import { registerAs } from '@nestjs/config';

export const swaggerConfig = registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'AxiaTI API',
  description: process.env.SWAGGER_DESCRIPTION || 'API para el sistema de gestión de tickets de soporte TI',
  version: process.env.SWAGGER_VERSION || '1.0',
  path: process.env.SWAGGER_PATH || 'api/docs',
}));
