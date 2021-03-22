import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService } from '@api/core/database/entity.service';

import { Message, MessageAddress, MessageContent } from './message.entity';
import { IotaService } from '@api/core/iota/iota.service';

@Injectable()
export class MessageService extends EntityService<Message> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepo: Repository<Message>,
        private readonly iotaService: IotaService
    ) {
        super();
    }

    public async create(content: MessageContent, address: MessageAddress): Promise<Message> {
        const messageResult = await this.iotaService.sendMessage(content, address);
        return new Message({
            id: this.createId([content, address]),
            content: content,
            bundle_hash: messageResult[0].hash,
            attached_at: new Date(messageResult[0].attachmentTimestamp)
        });
    }
}