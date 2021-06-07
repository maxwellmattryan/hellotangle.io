import { GetNodeInfoResponse } from '@iota/core';

import { BaseInterfaceService } from '@api/core/services/base.interface.service';

import { Message } from '@api/message/entities/message.entity';
import { IotaService } from '@api/message/services/iota.service';

/**
 * The injection token for an `IotaService`.
 */
export const IOTA_SERVICE = 'IotaServiceInterface';

/**
 * The IOTA service interface definition for using the IOTA API.
 */
export interface IotaServiceInterface extends BaseInterfaceService<IotaService> {
    /**
     * Connect to a node in the IOTA Tangle.
     * @returns Information about the node.
     */
    connectToNode(): Promise<GetNodeInfoResponse>;

    /**
     * Send a message transaction via the IOTA protocol.
     * @param message The message data to use in the transaction.
     * @returns The message including newly updated fields `hash` and `attached_at`.
     */
    sendMessage(message: Message): Promise<Message>;
}
