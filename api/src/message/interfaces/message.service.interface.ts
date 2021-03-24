import { BaseInterfaceService } from '@api/core/services/base.interface.service';

import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MessageService } from '@api/message/services/message.service';

export const MESSAGE_SERVICE = 'MessageServiceInterface';

/**
 * The message service interface definition for communicating with the IOTA Tangle.
 */
export interface MessageServiceInterface extends BaseInterfaceService<MessageService> {
    /**
     * Send a message via the IOTA protocol with data from the request.
     * @param messageDto The message data to use in creating a message.
     * @returns The resulting message with data from transaction.
     */
    sendMessage(messageDto: SendMessageDto): Promise<Message | void>;
}
