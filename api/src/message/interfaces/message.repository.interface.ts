import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';

import { Message } from '@api/message/entities/message.entity';

export const MESSAGE_REPOSITORY = 'MessageRepositoryInterface';

/**
 * Message repository interface definition for handling Message entities.
 */
export interface MessageRepositoryInterface extends BaseInterfaceRepository<Message> { }
