import { Component, OnInit } from '@angular/core';

import { NotificationService } from '@web/core/services/notification.service';

/**
 * The create message page allowing for users to enter a message to send via the IOTA protocol.
 */
@Component({
    selector: 'web-create-message-page',
    templateUrl: './create-message.page.html',
    styleUrls: ['./create-message.page.scss']
})
export class CreateMessagePage implements OnInit {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    ngOnInit(): void { }

    onAppear(): void {
        this.notificationService.createNotification('Hello, Tangle!');
    }
}
