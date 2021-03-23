import { Message } from '@api/message/entities/message.entity';
import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';

export interface MessageRepositoryInterface extends BaseInterfaceRepository<Message> { }
