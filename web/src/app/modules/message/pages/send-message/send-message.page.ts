import { Component, OnInit } from '@angular/core';

import { NotificationService } from '@web/core/services/notification.service';

/**
 * The send message page allowing for users to enter a message to send via the IOTA protocol.
 */
@Component({
    selector: 'web-send-message-page',
    templateUrl: './send-message.page.html',
    styleUrls: ['./send-message.page.scss']
})
export class SendMessagePage implements OnInit {
    constructor(
        private readonly notificationService: NotificationService
    ) { }

    ngOnInit(): void { }

    /**
     * Does something(s) when this component appears into view.
     */
    public onAppear(): void {
        this.notificationService.createNotification('Hello, Tangle!');
    }
}
