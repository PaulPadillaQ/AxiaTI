import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SupabaseService,
      useFactory: (configService: ConfigService) => {
        return new SupabaseService(
          configService.get<string>('database.supabase.url'),
          configService.get<string>('database.supabase.serviceRoleKey'),
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [SupabaseService],
})
export class SupabaseModule {}

