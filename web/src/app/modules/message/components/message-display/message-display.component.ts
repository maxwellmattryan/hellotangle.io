import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Message } from '@web/modules/message/models/message.model';
import { MessageService } from '@web/modules/message/services/message.service';

/**
 * The component for displaying messages in a consistent and tailored format.
 */
@Component({
    selector: 'web-message-display',
    templateUrl: './message-display.component.html',
    styleUrls: ['./message-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDisplayComponent implements OnInit {
    /**
     * The message data used by the component to display.
     */
    @Input() messageData: Message = new Message({});

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.initializeMessageData();
    }

    /**
     * Retrieves data from `MessageService` if not given as input.
     * @internal
     */
    private initializeMessageData(): void {
        if(!this.isMessageDataLoaded()) {
            this.messageData = this.messageService.retrieveMessage();
        }

        this.changeDetectorRef.detectChanges();
    }

    /**
     * Determines if the message data is loaded.
     * @returns A boolean that's true if the message has a defined `id` property.
     * @internal
     */
    public isMessageDataLoaded(): boolean {
        return this.messageData.id !== undefined;
    }
}
