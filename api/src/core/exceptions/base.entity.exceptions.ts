import { BadRequestException } from '@nestjs/common';

/**
 * Entity contains invalid and / or lacks valid data (i.e. no `id` property exists).
 */
export class EntityDataIsInvalidException extends BadRequestException {
    constructor() {
        super('Entity data is invalid.');
    }
}

/**
 * Entity containing the same "unique" value already exists in the database.
 */
export class EntityAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Entity already exists.');
    }
}

/**
 * Entity save operations fails for a generic reason.
 */
export class UnableToCreateEntityException extends BadRequestException {
    constructor() {
        super('Unable to create entity.');
    }
}
