import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsString, MaxLength, MinLength } from 'class-validator';

export class MessageDto {
    constructor(partial: Partial<MessageDto>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        example: 'Hello, Tangle!',
        description: 'Content to put inside message'
    })
    @MaxLength(256)
    @IsString()
    content!: string;

    @ApiProperty({
        example: 'FJDUTBPYGT9OGHPBFBJGYCZGYADIQEUFKMMMGCZWOHVE9HAQEYFFMSJTJSIYJLGGQUAXARVRASFBDIGXWVLIGPWMHD',
        description: 'Address to send message to'
    })
    @MinLength(90)
    @MaxLength(90)
    @IsString()
    @IsAlphanumeric()
    address!: string;

    @ApiProperty({
        example: 'JAYMRNADWH9KXMQ99CFFKCA9SCNAWMMRXACEPUXIL9DHVOLQDJIPGHFF9MFPZCZOCSWCQJYLCTDGGKXH9',
        description: 'Bundle hash result from message transaction'
    })
    @MinLength(81)
    @MaxLength(81)
    @IsString()
    @IsAlphanumeric()
    bundle_hash?: string;
}
