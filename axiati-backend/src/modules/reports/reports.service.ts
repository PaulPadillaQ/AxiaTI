import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../../entities/ticket.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getTicketStats() {
    const total = await this.ticketRepository.count();
    const open = await this.ticketRepository.count({ where: { statusId: 'open' } });
    const closed = await this.ticketRepository.count({ where: { statusId: 'closed' } });
    const inProgress = await this.ticketRepository.count({ where: { statusId: 'in-progress' } });

    return {
      total,
      open,
      closed,
      inProgress,
    };
  }

  async getTicketsByCategory() {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.category', 'category')
      .select('category.name', 'categoryName')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('category.id')
      .getRawMany();
  }

  async getTicketsByPriority() {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.priority', 'priority')
      .select('priority.name', 'priorityName')
      .addSelect('COUNT(ticket.id)', 'count')
      .groupBy('priority.id')
      .getRawMany();
  }
}
