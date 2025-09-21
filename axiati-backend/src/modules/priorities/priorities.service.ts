import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from '../../entities/priority.entity';

@Injectable()
export class PrioritiesService {
  constructor(
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  async findAll() {
    return this.priorityRepository.find({
      order: { level: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.priorityRepository.findOne({ where: { id } });
  }
}
