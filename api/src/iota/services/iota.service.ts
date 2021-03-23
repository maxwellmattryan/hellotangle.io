import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { asciiToTrytes } from '@iota/converter';
import { API, composeAPI, GetNodeInfoResponse, Transaction } from '@iota/core';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';
import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { Message } from '@api/message/entities/message.entity';
import { MessageAddress, MessageContent } from '@api/message/message.types';

import {
    UnableToBroadcastToTangleException,
    UnableToConnectToTangleNodeException,
    UnableToPrepareTangleTransferArrayException
} from '@api/iota/exceptions/iota.exceptions';
import { IotaServiceInterface } from '@api/iota/interfaces/iota.service.interface';

export type IotaNet = 'mainnet' | 'devnet';
export type IotaTransfer = { value: number, address: string, message: string };

@Injectable()
export class IotaService extends BaseAbstractService<IotaService> implements IotaServiceInterface {
    private readonly logger = new ExtendedLogger('IotaService');

    constructor(
        private readonly configService: ConfigService
    ) {
        super();

        this.connectToNode();
    }

    private composeIotaApi(): API {
        const nodeUrl = this.configService.get('IOTA_NODE_URL');
        return composeAPI({
            provider: nodeUrl
        });
    }

    public async connectToNode(): Promise<GetNodeInfoResponse> {
        return this.composeIotaApi().getNodeInfo()
            .then((data: GetNodeInfoResponse) => {
                this.logger.info(`Connected to IOTA node at ${data.time} with ${data.neighbors} neighbor(s)`);

                return data;
            })
            .catch((error) => {
                throw new UnableToConnectToTangleNodeException();
            });
    }

    public async sendMessage(message: Message): Promise<readonly Transaction[]> {
        const trytes = await this.prepareMessage(message);
        return this.broadcastMessage(trytes);
    }

    private async prepareMessage(message: Message): Promise<readonly string[]> {
        const iota: API = this.composeIotaApi();
        return iota.prepareTransfers(
            String(this.configService.get('IOTA_WALLET_SEED')),
            this.prepareTransfers(message.content, message.recipient_address)
        ).catch((error) => {
            throw new UnableToPrepareTangleTransferArrayException();
        });
    }

    private prepareTransfers(content: MessageContent, recipientAddress: MessageAddress): IotaTransfer[] {
        const message = JSON.stringify({ 'message': content });
        const messageInTrytes = asciiToTrytes(message);
        return [{
            value: 0.0,
            message: messageInTrytes,
            address: recipientAddress
        }];
    }

    private async broadcastMessage(trytes: readonly string[]): Promise<readonly Transaction[]> {
        const iota: API = this.composeIotaApi();
        return iota.sendTrytes(
            trytes,
            this.getDepth(),
            this.getMinimumWeightMagnitude()
        )
            .then((data: readonly Transaction[]) => {
                this.logger.info(`Broadcasted message to Tangle with hash of ${data[0].hash}`);

                return data;
            })
            .catch((error) => {
                throw new UnableToBroadcastToTangleException();
            });
    }

    private getDepth(): number {
        return 3;
    }

    private getMinimumWeightMagnitude(): number {
        const net = this.configService.get<IotaNet>('IOTA_NET') || 'devnet';

        return net === 'mainnet' ? 14 : 9;
    }
}
