import { EntityIsImmutableException } from '@api/core/exceptions/base.entity.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';

import { BaseAbstractRepository } from '@api/core/repositories/base.abstract.repository';
import { Id } from '@api/core/types/id.types';

import { Message } from '@api/message/entities/message.entity';
import { MessageRepositoryInterface } from '@api/message/interfaces/message.repository.interface';

/**
 * The message repository interface implementation for handling Message entities.
 *
 * _CAUTION:_ Messages __must__ only ever be created and saved to the database if
 * they have successfully been broadcasted to the Tangle. There is no reason
 * to modify them after the fact since that data immutably lives on the IOTA Tangle.
 * With that I have overridden the default repository `update()` and `delete()` methods to
 * throw errors immediately upon trying to call them.
 */
@Injectable()
export class MessageRepository extends BaseAbstractRepository<Message> implements MessageRepositoryInterface {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {
        super(messageRepository);
    }

    /**
     * Update a message entity with data.
     * @param id The ID of the message to update.
     * @param data The message data to use to update the message entity.
     * @returns A message with the updated fields.
     * @throws {@link EntityIsImmutableException} because messages are immutable once they've been attached to the IOTA Tangle.
     * @override
     */
    public async update(id: Id, data: Message): Promise<Message | void> {
        throw new EntityIsImmutableException();
    }

    /**
     * Delete a message entity.
     * @param id The ID of the message to delete.
     * @returns A deletion result object.
     * @throws {@link EntityIsImmutableException} because messages are immutable once they've been attached to the IOTA Tangle.
     * @override
     */
    public async delete(id: Id): Promise<DeleteResult> {
        throw new EntityIsImmutableException();
    }
}
