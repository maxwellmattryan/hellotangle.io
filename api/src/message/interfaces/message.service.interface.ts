import { BaseInterfaceService } from '@api/core/services/base.interface.service';

import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MessageService } from '@api/message/services/message.service';

export const MESSAGE_SERVICE = 'MessageServiceInterface';

export interface MessageServiceInterface extends BaseInterfaceService<MessageService> {
    sendMessage(messageDto: SendMessageDto): Promise<Message>;
}
