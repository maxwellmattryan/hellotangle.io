import { Message } from '@api/message/entities/message.entity';
import { MessageService } from '@api/message/services/message.service';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { BaseInterfaceService } from '@api/core/services/base.interface.service';

export interface MessageServiceInterface extends BaseInterfaceService<MessageService> {
    sendMessage(messageDto: SendMessageDto): Promise<Message>;
}
