import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { DatabaseModule } from '../../database/database.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { PrioritiesModule } from '../priorities/priorities.module';
import { StatusesModule } from '../statuses/statuses.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    CategoriesModule,
    PrioritiesModule,
    StatusesModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
