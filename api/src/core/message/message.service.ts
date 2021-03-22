import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from '@iota/core';

import { Repository } from 'typeorm';

import { EntityService } from '@api/core/database/entity.service';
import { IotaService } from '@api/core/iota/iota.service';

import { Message, MessageAddress, MessageBundleHash, MessageContent } from './message.entity';
import { UnableToCreateMessageException } from './message.exception';

@Injectable()
export class MessageService extends EntityService<Message> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepo: Repository<Message>,
        private readonly iotaService: IotaService
    ) {
        super();
    }

    public create(content: MessageContent, address: MessageAddress): Message {
        return new Message({
            id: this.createId([String(content), address]),
            content: content,
            initiated_at: new Date(Date.now())
        });
    }

    public async send(content: MessageContent, address: MessageAddress): Promise<Message> {
        let message = await this.create(content, address);
        const messageResult = await this.iotaService.sendMessage(content, address);

        const bundleHash: MessageBundleHash = (messageResult as readonly Transaction[])[0].hash;
        const attachedAt: Date = new Date((messageResult as readonly Transaction[])[0].attachmentTimestamp);

        return this.save(new Message({
            ...message,
            bundle_hash: bundleHash,
            attached_at: attachedAt
        }));
    }

    public async save(message: Message): Promise<Message> {
        return this.messageRepo.save(message)
        .catch((error) => {
            throw new UnableToCreateMessageException();
        })
    }
}
