import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';

import { Message } from '@api/message/entities/message.entity';

/**
 * The injection token for an `MessageRepository`.
 */
export const MESSAGE_REPOSITORY = 'MessageRepositoryInterface';

/**
 * The message repository interface definition for handling Message entities.
 */
export interface MessageRepositoryInterface extends BaseInterfaceRepository<Message> { }
