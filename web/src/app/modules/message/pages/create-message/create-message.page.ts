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
    public isFillingMessageForm: boolean = false;

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

    /**
     * Initializes the message form by setting a boolean flag, causing
     * change detection to render the form.
     */
    public initializeMessageForm(): void {
        this.isFillingMessageForm = true;
    }
}
