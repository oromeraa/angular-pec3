import { Component } from '@angular/core';
import { Signal } from '@angular/core';
import { NotificationMessage, NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly notification: Signal<NotificationMessage | null>;

  constructor(private notificationService: NotificationService) {
    this.notification = this.notificationService.notification;
  }

  dismiss(): void {
    this.notificationService.clear();
  }
}
