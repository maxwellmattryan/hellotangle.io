import { Inject, Injectable } from '@nestjs/common';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';

import { IOTA_SERVICE, IotaServiceInterface } from '@api/message/interfaces/iota.service.interface';
import { Message } from '@api/message/entities/message.entity';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { MESSAGE_REPOSITORY, MessageRepositoryInterface } from '@api/message/interfaces/message.repository.interface';
import { MessageServiceInterface } from '@api/message/interfaces/message.service.interface';

/**
 * Message service interface implementation for communicating with the IOTA Tangle.
 */
@Injectable()
export class MessageService extends BaseAbstractService<Message> implements MessageServiceInterface {
    constructor(
        @Inject(IOTA_SERVICE)
        private readonly iotaService: IotaServiceInterface,
        @Inject(MESSAGE_REPOSITORY)
        private readonly messageRepository: MessageRepositoryInterface
    ) {
        super();
    }

    /**
     * Send message to IOTA Tangle with data from request.
     * @param messageDto The message data to use in creating a message.
     * @returns The resulting message with data from transaction.
     */
    public async sendMessage(messageDto: SendMessageDto): Promise<Message> {
        let message = this.messageRepository.prepare(
            new Message({ ...messageDto }),
            [messageDto.content as string, messageDto.recipient_address]
        );
        return this.iotaService.sendMessage(message);
    }
}
