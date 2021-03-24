import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { MessageAddress, MessageContent } from '@api/message/message.types';

/**
 * The message transfer data object (DTO) for sending messages via the IOTA protocol.
 */
export class SendMessageDto {
    constructor(partial: Partial<SendMessageDto>) {
        Object.assign(this, partial);
    }

    /**
     * The content of a message, which __must__ be at least one character and no more than 256 (512 bytes in TS).
     */
    @MinLength(1)
    @MaxLength(256)
    @IsString()
    @IsNotEmpty()
    content!: MessageContent;

    /**
     * The receipient address for a message, which __must__ be an alphanumeric string containing exactly 90 characters (180 bytes in TS).
     */
    @MinLength(90)
    @MaxLength(90)
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    recipient_address!: MessageAddress;
}
