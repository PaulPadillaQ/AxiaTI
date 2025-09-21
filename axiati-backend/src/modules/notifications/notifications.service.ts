import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(userId: string) {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string, userId: string) {
    await this.notificationRepository.update(
      { id, userId },
      { isRead: true },
    );
    return { message: 'Notificación marcada como leída' };
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepository.update(
      { userId },
      { isRead: true },
    );
    return { message: 'Todas las notificaciones marcadas como leídas' };
  }
}
