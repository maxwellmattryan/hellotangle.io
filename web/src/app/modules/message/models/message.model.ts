import { Id } from '@web/core/types/id.type';
import { MessageAddress, MessageContent, MessageHash } from '@web/modules/message/types/message.types';

/**
 * The message interface containing all relevant properties for IOTA protocol messages.
 */
export class Message {
    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }

    /**
     * The ID of a message, which __must__ be an alphanumeric string of exactly 64 characters.
     */
    id?: Id;

    /**
     * The content of a message, which __must__ be a string of no more than 256 characters and
     * __must__ exist to handle that message.
     */
    content: MessageContent = '';

    /**
     * The receipient address for a message, which __must__ be an alphanumeric string of
     * exactly 90 characters and __must__ exist to handle that message.
     */
    recipient_address: MessageAddress = '';

    /**
     * The transaction hash of a message, which __must__ be an alphanumeric string of
     * exactly 81 characters.
     */
    hash?: MessageHash;

    /**
     * The timestamp that a message was initiated at.
     */
    initiated_at?: Date;

    /**
     * The timestamp that a message was attached to the IOTA Tangle.
     */
    attached_at?: Date;
}
