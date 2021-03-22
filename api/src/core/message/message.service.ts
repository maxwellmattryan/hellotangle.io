import { Injectable } from '@nestjs/common';

import { Transaction } from '@iota/core';

import { IotaService } from '@api/core/iota/iota.service';

import { Message } from './message.entity';
import { MessageRepository } from './message.repository';
import { MessageAddress, MessageBundleHash, MessageContent } from './message.types';

@Injectable()
export class MessageService {
    constructor(
        private readonly iotaService: IotaService,
        private readonly messageRepository: MessageRepository
    ) { }

    public async sendMessage(content: MessageContent, address: MessageAddress): Promise<Message> {
        let message = await this.messageRepository.createMessage(content, address);
        const messageResult = await this.iotaService.sendMessage(content, address);

        const bundleHash: MessageBundleHash = (messageResult as readonly Transaction[])[0].hash;
        const attachedAt: Date = new Date((messageResult as readonly Transaction[])[0].attachmentTimestamp);

        return this.messageRepository.saveMessage(new Message({
            ...message,
            bundle_hash: bundleHash,
            attached_at: attachedAt
        }));
    }
}
