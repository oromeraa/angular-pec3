import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationMessage {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly notification = signal<NotificationMessage | null>(null);

  showSuccess(message: string): void {
    this.notification.set({ message, type: 'success' });
    this.autoClear();
  }

  showError(message: string): void {
    this.notification.set({ message, type: 'error' });
    this.autoClear();
  }

  showInfo(message: string): void {
    this.notification.set({ message, type: 'info' });
    this.autoClear();
  }

  clear(): void {
    this.notification.set(null);
  }

  private autoClear(delayMs: number = 4000): void {
    setTimeout(() => this.notification.set(null), delayMs);
  }
}
