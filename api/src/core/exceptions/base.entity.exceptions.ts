import { BadRequestException } from '@nestjs/common';

/**
 * Entity containing the same unique value already exists in the database.
 */
export class EntityAlreadyExistsException extends BadRequestException {
    constructor() {
        super('Entity containing the same unique value already exists in the database.');
    }
}

/**
 * Entity contains invalid and/or lacks valid data (i.e. no `id` property exists).
 */
export class EntityDataIsInvalidException extends BadRequestException {
    constructor() {
        super('Entity contains invalid and/or lacks valid data.');
    }
}

/**
 * Entity is immutable, which means that it _cannot_ be updated or deleted.
 */
export class EntityIsImmutableException extends BadRequestException {
    constructor() {
        super('Entity is immutable, which means that it cannot be updated or deleted.');
    }
}

/**
 * Entity validation failed, which means that there were fields containing invalid data.
 */
export class EntityValidationFailedException extends BadRequestException {
    constructor() {
        super('Entity validation failed, which means that there were fields containing invalid data.');
    }
}

/**
 * Entity save operation fails for a generic reason.
 */
export class UnableToCreateEntityException extends BadRequestException {
    constructor() {
        super('Entity save operation failed.');
    }
}
