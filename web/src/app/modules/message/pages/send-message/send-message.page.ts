import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageApiService } from '@web/modules/message/services/message-api.service';

/**
 * The page component allowing for users to enter a message to send via the IOTA protocol.
 */
@Component({
    selector: 'web-send-message-page',
    templateUrl: './send-message.page.html',
    styleUrls: ['./send-message.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendMessagePage implements OnInit {
    constructor(
        private readonly messageApiService: MessageApiService,
        private readonly title: Title
    ) { }

    ngOnInit(): void {
        this.title.setTitle(`IOTA Message Form | HelloTangle`);

        // NOTE: Because of the nature GCP Cloud Run (which hosts this app),
        // there are possibilities for cold starts. This method call is for
        // making sure the server is ready to get when the user sends a message.
        this.messageApiService.getRoot().subscribe((res: { message: string }) => { });
    }
}
