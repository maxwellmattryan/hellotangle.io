import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { Message } from '@api/core/message/message.entity';
import { MessageService } from '@api/core/message/message.service';

import { MessageDto } from '@api/core/message/message.dto';

@Controller('')
export class ApiController {
    constructor(
        private readonly messageService: MessageService
    ) { }

    @Get('')
    @HttpCode(200)
    public async getHome(): Promise<string> {
        return 'Hello, Tangle!';
    }

    @Post('send')
    @HttpCode(201)
    public async createMessage(
        @Body() messageDto: MessageDto
    ): Promise<Message> {
        return this.messageService.create(messageDto.content, messageDto.address);
    }
}
