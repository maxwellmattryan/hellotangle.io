import { GetNodeInfoResponse, Transaction } from '@iota/core';

import { BaseInterfaceService } from '@api/core/services/base.interface.service';

import { Message } from '@api/message/entities/message.entity';
import { IotaService } from '@api/message/services/iota.service';

export const IOTA_SERVICE = 'IotaServiceInterface';

export interface IotaServiceInterface extends BaseInterfaceService<IotaService> {
    connectToNode(): Promise<GetNodeInfoResponse>;
    sendMessage(message: Message): Promise<Message>;
}
