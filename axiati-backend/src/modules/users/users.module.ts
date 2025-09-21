import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../../database/database.module';
import { SupabaseModule } from '../../database/supabase.module';

@Module({
  imports: [DatabaseModule, SupabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
