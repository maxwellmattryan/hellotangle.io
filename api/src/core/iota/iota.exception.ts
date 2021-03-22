import { BadRequestException } from '@nestjs/common';

export class UnableToBroadcastToTangleException extends BadRequestException {
    constructor() {
        super('Unable to broadcast message to the Tangle.');
    }
}

export class UnableToConnectToTangleNodeException extends BadRequestException {
    constructor() {
        super('Unable to connect to node in the Tangle.');
    }
}

export class UnableToPrepareTangleTransferArrayException extends BadRequestException {
    constructor() {
        super('Unable to prepare the transfer array for the Tangle.');
    }
}
