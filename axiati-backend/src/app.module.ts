import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SupabaseModule } from './database/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrioritiesModule } from './modules/priorities/priorities.module';
import { StatusesModule } from './modules/statuses/statuses.module';
import { ReportsModule } from './modules/reports/reports.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),
    
    // Módulos de base de datos
    DatabaseModule,
    SupabaseModule,
    
    // Módulos de funcionalidad
    AuthModule,
    UsersModule,
    TicketsModule,
    CommentsModule,
    CategoriesModule,
    PrioritiesModule,
    StatusesModule,
    ReportsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
