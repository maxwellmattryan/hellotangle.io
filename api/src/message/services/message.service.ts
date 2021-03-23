import { Injectable } from '@nestjs/common';

import { Transaction } from '@iota/core';

import { IotaService } from '@api/iota/services/iota.service';

import { Message } from '../entities/message.entity';
import { MessageRepository } from '../repositories/message.repository';
import { MessageAddress, MessageHash, MessageContent } from '../message.types';

@Injectable()
export class MessageService {
    constructor(
        private readonly iotaService: IotaService,
        private readonly messageRepository: MessageRepository
    ) { }

    public async sendMessage(content: MessageContent, address: MessageAddress): Promise<Message> {
        let message = await this.messageRepository.createMessage(content, address);
        const messageResult = await this.iotaService.sendMessage(content, address);

        const hash: MessageHash = (messageResult as readonly Transaction[])[0].hash;
        const attachedAt: Date = new Date((messageResult as readonly Transaction[])[0].attachmentTimestamp);

        return this.messageRepository.saveMessage(new Message({
            ...message,
            hash: hash,
            attached_at: attachedAt
        }));
    }
}
