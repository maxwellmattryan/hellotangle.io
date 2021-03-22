import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Message } from '@api/core/message/message.entity';
import { MessageService } from '@api/core/message/message.service';

import { MessageDto } from '@api/core/message/message.dto';

@Controller('')
export class ApiController {
    constructor(
        private readonly messageService: MessageService
    ) { }

    @ApiResponse({ status: HttpStatus.OK, description: 'Welcome to the HelloTangle API!' })
    @Get('')
    @HttpCode(HttpStatus.OK)
    public async getHome(): Promise<string> {
        return 'Hello, Tangle!';
    }

    @ApiResponse({ status: HttpStatus.CREATED, description: 'Send a message to the Tangle.' })
    @Post('send')
    @HttpCode(HttpStatus.CREATED)
    public async createMessage(
        @Body() messageDto: MessageDto
    ): Promise<Message> {
        return this.messageService.send(messageDto.content, messageDto.address);
    }
}
