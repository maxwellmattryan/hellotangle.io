import { BadRequestException } from '@nestjs/common';

/**
 * Error in broadcasting a message to the IOTA Tangle.
 */
export class UnableToBroadcastToTangleException extends BadRequestException {
    constructor() {
        super('There was an error in trying to broadcast a message to the IOTA Tangle.');
    }
}

/**
 * Error in connecting to a node in the IOTA Tangle.
 */
export class UnableToConnectToTangleNodeException extends BadRequestException {
    constructor() {
        super('There was an error in trying to connect to a node in the IOTA Tangle.');
    }
}

/**
 * Error in preparing the transaction transfer array for the IOTA Tangle.
 */
export class UnableToPrepareTangleTransferArrayException extends BadRequestException {
    constructor() {
        super('There was an error in preparing the transaction transfer array for the IOTA Tangle.');
    }
}
