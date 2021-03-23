import { EntityRepository, Repository } from 'typeorm';

import { createId } from '@api/shared/utils/id.util';

import { Message } from '../entities/message.entity';
import { MessageAddress, MessageContent } from '../message.types';
import { UnableToCreateMessageException } from '../exceptions/message.exception';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    public async createMessage(content: MessageContent, address: MessageAddress): Promise<Message> {
        const message = new Message({
            id: createId([String(content), address]),
            content: content,
            initiated_at: new Date(Date.now())
        });

        return this.save(message);
    }

    public async saveMessage(message: Message): Promise<Message> {
        return this.save(message)
        .catch((error) => {
            throw new UnableToCreateMessageException();
        });
    }
}
