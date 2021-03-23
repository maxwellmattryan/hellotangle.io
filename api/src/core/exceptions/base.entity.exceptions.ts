import { BadRequestException } from '@nestjs/common';

export class EntityDataIsInvalid extends BadRequestException {
    constructor() {
        super('Entity data is invalid.');
    }
}

export class EntityAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Entity already exists.');
    }
}

export class UnableToCreateEntityException extends BadRequestException {
    constructor() {
        super('Unable to create entity.');
    }
}
