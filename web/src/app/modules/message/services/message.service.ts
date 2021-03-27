import { Injectable } from '@angular/core';

import { BaseAbstractService } from '@web/core/services/base.abstract.service';
import { Message } from '@web/modules/message/models/message.model';
import { MessageServiceInterface } from '@web/modules/message/interfaces/message.service.interface';

/**
 * The message service interface implementation for handling messages throughout the app.
 */
@Injectable({
    providedIn: 'root'
})
export class MessageService extends BaseAbstractService<MessageService> implements MessageServiceInterface {
    private message: Message = new Message({});

    constructor() { super(); }

    /**
     * Store a message to this service to retrieve later.
     * @param message The message to be stored.
     */
    public storeMessage(message: Message): void {
        this.message = message;
    }

    /**
     * Retrieve a message from this service that was previously stored.
     * @returns A message object containing data from the previously stored message or nothing (if not stored).
     */
    public retrieveMessage(): Message {
        return this.message;
    }
}
