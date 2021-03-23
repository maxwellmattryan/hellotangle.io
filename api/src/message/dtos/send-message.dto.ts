import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { MessageAddress, MessageContent } from '../message.types';

export class SendMessageDto {
    constructor(partial: Partial<SendMessageDto>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        example: 'Hello, Tangle!',
        description: 'Content to put inside message',
        minLength: 256,
        maxLength: 256,
        required: true
    })
    @MaxLength(256)
    @IsString()
    @IsNotEmpty()
    content!: MessageContent;

    @ApiProperty({
        example: 'FJDUTBPYGT9OGHPBFBJGYCZGYADIQEUFKMMMGCZWOHVE9HAQEYFFMSJTJSIYJLGGQUAXARVRASFBDIGXWVLIGPWMHD',
        description: 'Address to send message to',
        minLength: 90,
        maxLength: 90,
        required: true
    })
    @MinLength(90)
    @MaxLength(90)
    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    recipient_address!: MessageAddress;
}
