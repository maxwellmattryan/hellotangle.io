import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { BaseAbstractRepository } from '@api/core/repositories/base.abstract.repository';
import { Id } from '@api/core/types/id.types';

import { Message } from '@api/message/entities/message.entity';
import { UnableToDeleteMessageException, UnableToUpdateMessageException } from '@api/message/exceptions/message.exceptions';
import { MessageRepositoryInterface } from '@api/message/interfaces/message.repository.interface';

@Injectable()
export class MessageRepository extends BaseAbstractRepository<Message> implements MessageRepositoryInterface {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {
        super(messageRepository);
    }

    // NOTE: Messages should only ever be created and saved to the database.
    // There would never be a use case to edit them after the fact.
    // For that reason, I'm overriding any function that intends to offer
    // some type of mutability (i.e. updating and deleting).

    public async update(id: Id, data: Message): Promise<Message | void> {
        throw new UnableToUpdateMessageException();
    }

    public async delete(id: Id): Promise<DeleteResult> {
        throw new UnableToDeleteMessageException();
    }
}
