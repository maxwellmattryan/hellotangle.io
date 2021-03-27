import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@web/environments/environment';
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
    @Input() messageData: Message = new Message({ });

    public messageKeys: string [] = Object.keys(this.messageData);

    constructor(
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly messageService: MessageService,
        private readonly router: Router
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

            if(!this.isMessageDataLoaded()) {
                this.router.navigate(['']);
            }
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

    /**
     * Returns the URL for the IOTA Explorer application.
     * @returns A URL string for our message.
     * @internal
     */
    public getIotaExplorerUrl(): string {
        const isProd: boolean = environment.production;
        return `https://explorer.iota.org/${isProd ? 'mainnet' : 'devnet'}/transaction/${this.messageData.hash}`;
    }

    /**
     * Returns a human readable date string.
     * @param date The date to format.
     * @returns A date string in human readable format.
     * @internal
     */
    public formatDate(date: Date | undefined): string {
        return new Date(date as Date).toLocaleString();
    }
}
