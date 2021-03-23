import { Message } from '@api/message/entities/message.entity';
import { IotaService } from '@api/iota/services/iota.service';
import { GetNodeInfoResponse, Transaction } from '@iota/core';
import { BaseInterfaceService } from '@api/core/services/base.interface.service';

export interface IotaServiceInterface extends BaseInterfaceService<IotaService>{
    connectToNode(): Promise<GetNodeInfoResponse>;
    sendMessage(message: Message): Promise<readonly Transaction[]>;
}