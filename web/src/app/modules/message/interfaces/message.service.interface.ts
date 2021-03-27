import { BaseInterfaceService } from '@web/core/services/base.interface.service';
import { Message } from '@web/modules/message/models/message.model';
import { MessageService } from '@web/modules/message/services/message.service';

/**
 * The message service interface definition for handling messages throughout the app.
 */
export interface MessageServiceInterface extends BaseInterfaceService<MessageService> {
    /**
     * Store a message to this service to retrieve later.
     * @param message The message to be stored.
     */
    storeMessage(message: Message): void;

    /**
     * Retrieve a message from this service that was previously stored.
     * @returns A message object containing data from the previously stored message or nothing (if not stored).
     */
    retrieveMessage(): Message;
}
