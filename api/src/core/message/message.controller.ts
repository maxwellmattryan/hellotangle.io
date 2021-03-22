import { Controller, Get, HttpCode, Post } from '@nestjs/common';

import { MessageService } from './message.service';
import { Message } from '@api/core/message/message.entity';

@Controller('messages')
export class MessageController {
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
    public async createMessage(): Promise<Message> {
        const content: string = 'Hello, Tangle!';
        return this.messageService.create(content);
    }
}
