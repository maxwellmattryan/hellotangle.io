import { Inject, Injectable } from '@nestjs/common';

import { Transaction } from '@iota/core';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';
import { IotaService } from '@api/iota/services/iota.service';

import { Message } from '../entities/message.entity';
import { SendMessageDto } from '../dtos/send-message.dto';
import { MessageHash } from '../message.types';
import { MessageRepositoryInterface } from '../interfaces/message.repository.interface';
import { MessageServiceInterface } from '../interfaces/message.service.interface';

@Injectable()
export class MessageService extends BaseAbstractService<Message> implements MessageServiceInterface {
    constructor(
        // TODO: Add IOTA inject token
        private readonly iotaService: IotaService,
        @Inject('MessageRepositoryInterface')
        private readonly messageRepository: MessageRepositoryInterface
    ) {
        super();
    }

    public async sendMessage(messageDto: SendMessageDto): Promise<Message> {
        let message = await this.messageRepository.create(new Message({ ...messageDto }));
        const messageResult = await this.iotaService.sendMessage(message);
        console.log(message, messageResult);

        const hash: MessageHash = (messageResult as readonly Transaction[])[0].hash;
        const attachedAt: Date = new Date((messageResult as readonly Transaction[])[0].attachmentTimestamp);

        const updateResult = await this.messageRepository.update(message.id, new Message({
            ...message,
            hash: hash,
            attached_at: attachedAt
        }));

        return message;
    }
}
