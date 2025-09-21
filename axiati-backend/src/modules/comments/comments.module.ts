import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { DatabaseModule } from '../../database/database.module';
import { UsersModule } from '../users/users.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [DatabaseModule, UsersModule, TicketsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
