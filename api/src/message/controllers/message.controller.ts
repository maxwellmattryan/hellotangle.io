import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';

import { Routes } from '@api/core/configs/routes.config';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MESSAGE_SERVICE, MessageServiceInterface } from '@api/message/interfaces/message.service.interface';
import { IOTA_SERVICE, IotaServiceInterface } from "@api/message/interfaces/iota.service.interface";

/**
 * The message controller for handling requests related to IOTA protocol communication.
 */
@Controller()
export class MessageController {
    constructor(
        @Inject(MESSAGE_SERVICE)
        private readonly messageService: MessageServiceInterface,
        @Inject(IOTA_SERVICE)
        private readonly iotaService: IotaServiceInterface
    ) { }

    /**
     * Send a message to a specified address in the IOTA Tangle.
     * @param messageDto The message data transfer object (DTO) holding the content and recipient_address information.
     * @returns A message containing the data originally sent plus data from the resulting IOTA protocol transaction.
     */
    @Post(Routes.Messages.send)
    @HttpCode(HttpStatus.CREATED)
    public async createMessage(
        @Body() messageDto: SendMessageDto
    ): Promise<Message | void> {
        return this.messageService.sendMessage(messageDto);
    }
}
