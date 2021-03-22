import { Controller, Get, HttpCode } from '@nestjs/common';

import { MessageService } from './message.service';

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
}
