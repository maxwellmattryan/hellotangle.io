import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Message } from '@api/message/entities/message.entity';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { MessageServiceInterface } from '@api/message/interfaces/message.service.interface';

@Controller('messages')
export class MessageController {
    constructor(
        @Inject('MessageServiceInterface')
        private readonly messageService: MessageServiceInterface
    ) { }

    @ApiResponse({ status: HttpStatus.CREATED, description: 'Send a message to the Tangle.' })
    @Post('send')
    @HttpCode(HttpStatus.CREATED)
    public async createMessage(
        @Body() messageDto: SendMessageDto
    ): Promise<Message> {
        return this.messageService.sendMessage(messageDto);
    }
}
