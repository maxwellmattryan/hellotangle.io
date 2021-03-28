import {
    IsAlphanumeric,
    IsAscii,
    IsDateString, IsDefined,
    IsNotEmpty, IsOptional,
    IsString, Matches,
    MaxLength,
    MinLength
} from 'class-validator';

import { MessageAddress, MessageContent } from '@api/message/types/message.types';

/**
 * The message transfer data object (DTO) for sending messages via the IOTA protocol.
 */
export class SendMessageDto {
    constructor(partial: Partial<SendMessageDto>) {
        Object.assign(this, partial);
    }

    /**
     * The content of a message, which __must__ be an ASCII string of at least one character and no more than 512 (1 kilobyte in TS).
     */
    @IsNotEmpty()
    @IsAscii()
    @MinLength(1)
    @MaxLength(512)
    content!: MessageContent;

    /**
     * The receipient address of a message, which __must__ be an alphanumeric string containing exactly 64 characters (128 bytes in TS)
     * and prefixed with "atoi".
     */
    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(64)
    @MaxLength(64)
    @Matches(/^atoi[a-z0-9]{60}$/)
    recipient_address!: MessageAddress;

    /**
     * The timestamp that a message was initiated at, ideally set by the client.
     */
    @IsOptional()
    @IsDateString()
    initiated_at?: Date;
}
