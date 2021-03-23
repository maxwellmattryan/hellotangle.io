import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@api/core/repositories/base.abstract.repository';

import { Message } from '../entities/message.entity';
import { MessageRepositoryInterface } from '../interfaces/message.repository.interface';

@Injectable()
export class MessageRepository extends BaseAbstractRepository<Message> implements MessageRepositoryInterface {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {
        super(messageRepository);
    }
}
