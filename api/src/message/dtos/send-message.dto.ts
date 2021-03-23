import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { Id } from '@api/core/types/id.types';

import { MessageAddress, MessageHash, MessageContent } from '../message.types';

export class SendMessageDto {
    constructor(partial: Partial<SendMessageDto>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        example: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
        description: 'Server-generated message ID',
        minLength: 64,
        maxLength: 64,
        required: false
    })
    @MinLength(64)
    @MaxLength(64)
    @IsString()
    @IsAlphanumeric()
    id?: Id;

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

    @ApiProperty({
        example: 'JAYMRNADWH9KXMQ99CFFKCA9SCNAWMMRXACEPUXIL9DHVOLQDJIPGHFF9MFPZCZOCSWCQJYLCTDGGKXH9',
        description: 'Hash result from message transaction',
        minLength: 81,
        maxLength: 81,
        required: false
    })
    @MinLength(81)
    @MaxLength(81)
    @IsString()
    @IsAlphanumeric()
    hash?: MessageHash;
}
