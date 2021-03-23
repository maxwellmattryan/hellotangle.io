import { BadRequestException } from '@nestjs/common';

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
