import { type NotificationsRepository } from '@/domain/notification/app/repositories/notifications-repository'
import { type Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }
}
