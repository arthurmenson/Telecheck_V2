export type NotificationType = 'info' | 'warning' | 'error' | 'success' | 'critical';

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationPreferences {
  userId: string;
  email?: boolean;
  push?: boolean;
  sms?: boolean;
  quietHours?: { start: string; end: string };
}

class NotificationsRepo {
  items: Map<string, NotificationItem[]> = new Map(); // userId -> list
  prefs: Map<string, NotificationPreferences> = new Map();

  create(userId: string, input: Omit<NotificationItem, 'id'|'createdAt'|'userId'|'isRead'>) {
    const list = this.items.get(userId) || [];
    const item: NotificationItem = {
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      userId,
      type: input.type,
      title: input.title,
      message: input.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    list.unshift(item);
    this.items.set(userId, list);
    return item;
  }

  list(userId: string) {
    return this.items.get(userId) || [];
  }

  markRead(userId: string, id: string) {
    const list = this.items.get(userId) || [];
    const found = list.find(n => n.id === id);
    if (found) found.isRead = true;
    return found !== undefined;
  }

  markAllRead(userId: string) {
    const list = this.items.get(userId) || [];
    list.forEach(n => { n.isRead = true; });
    return list.length;
  }

  updatePreferences(userId: string, prefs: Partial<NotificationPreferences>) {
    const current = this.prefs.get(userId) || { userId };
    const next = { ...current, ...prefs, userId } as NotificationPreferences;
    this.prefs.set(userId, next);
    return next;
  }

  getPreferences(userId: string) {
    return this.prefs.get(userId) || { userId, email: true, push: true, sms: false };
  }
}

export const notificationsRepo = new NotificationsRepo();


