import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../../entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async findAll() {
    return this.statusRepository.find({
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string) {
    return this.statusRepository.findOne({ where: { id } });
  }
}
