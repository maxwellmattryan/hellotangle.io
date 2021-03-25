import { Component, OnInit } from '@angular/core';

import { NotificationService } from '@web/core/services/notification.service';

@Component({
    selector: 'web-create-message-page',
    templateUrl: './create-message.page.html',
    styleUrls: ['./create-message.page.scss']
})
export class CreateMessagePage implements OnInit {

    constructor(
        private readonly notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.notificationService.createNotification('Hello, world!');
    }
}
