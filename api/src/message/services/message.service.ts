import { IOTA_SERVICE, IotaServiceInterface } from '@api/iota/interfaces/iota.service.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';

import { Transaction } from '@iota/core';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';

import { Message } from '@api/message/entities/message.entity';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { MessageHash } from '@api/message/message.types';
import { MESSAGE_REPOSITORY, MessageRepositoryInterface } from '@api/message/interfaces/message.repository.interface';
import { MessageServiceInterface } from '@api/message/interfaces/message.service.interface';

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

    public async sendMessage(messageDto: SendMessageDto): Promise<Message> {
        let message = (await this.messageRepository.create(new Message({ ...messageDto })) as Message);
        const messageResult = await this.iotaService.sendMessage(message);

        const hash: MessageHash = messageResult[0].hash;
        const attachedAt: Date = new Date((messageResult as readonly Transaction[])[0].attachmentTimestamp);

        console.log(message);

        message = (await this.messageRepository.update(message.id, new Message({
            ...message,
            hash: hash,
            attached_at: attachedAt
        })) as Message);
        return message;
    }
}
