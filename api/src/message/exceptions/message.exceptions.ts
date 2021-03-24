import { BadRequestException } from '@nestjs/common';

/**
 * Error in saving a message to the database.
 */
export class UnableToCreateMessageException extends BadRequestException {
    constructor() {
        super('There was an error in saving a message to the database.');
    }
}

/**
 * Error in updating a message in the database.
 */
export class UnableToUpdateMessageException extends BadRequestException {
    constructor() {
        super('There was an error in updating a message in the database.');
    }
}

/**
 * Error in deleting a message from the database.
 */
export class UnableToDeleteMessageException extends BadRequestException {
    constructor() {
        super('There was an error in deleting a message from the database.');
    }
}
