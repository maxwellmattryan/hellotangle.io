import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Message } from '@api/message/entities/message.entity';
import { MessageDto } from '@api/message/dtos/message.dto';
import { MessageService } from '@api/message/services/message.service';

@Controller('messages')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) { }

    @ApiResponse({ status: HttpStatus.CREATED, description: 'Send a message to the Tangle.' })
    @Post('send')
    @HttpCode(HttpStatus.CREATED)
    public async createMessage(
        @Body() messageDto: MessageDto
    ): Promise<Message> {
        return this.messageService.sendMessage(messageDto.content, messageDto.address);
    }
}
