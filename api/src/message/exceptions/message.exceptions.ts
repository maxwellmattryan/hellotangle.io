import { BadRequestException } from '@nestjs/common';

export class UnableToCreateMessageException extends BadRequestException {
    constructor() {
        super('Unable to create message.');
    }
}

export class UnableToUpdateMessageException extends BadRequestException {
    constructor() {
        super('Unable to update message (due to immutability).');
    }
}

export class UnableToDeleteMessageException extends BadRequestException {
    constructor() {
        super('Unable to delete message (due to immutability).');
    }
}
