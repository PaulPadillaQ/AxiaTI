import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiPrefix: process.env.API_PREFIX || 'api',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
}));
