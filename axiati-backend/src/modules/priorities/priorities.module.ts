import { Module } from '@nestjs/common';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PrioritiesController],
  providers: [PrioritiesService],
  exports: [PrioritiesService],
})
export class PrioritiesModule {}
