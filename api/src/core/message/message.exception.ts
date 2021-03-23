import { BadRequestException } from '@nestjs/common';

export class UnableToCreateMessageException extends BadRequestException {
    constructor() {
        super('Unable to create message.');
    }
}
