import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { EntityService } from '@api/core/database/entity.service';

import { Message, MessageContent } from './message.entity';

@Injectable()
export class MessageService extends EntityService<Message> {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepo: Repository<Message>
    ) {
        super();
    }

    public async create(content: MessageContent): Promise<Message> {
        return new Message({
            id: this.createId([content]),
            content: content
        });
    }
}