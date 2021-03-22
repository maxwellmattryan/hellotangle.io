import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { API, composeAPI, GetNodeInfoResponse, Transaction } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';

import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { MessageAddress, MessageContent } from '@api/core/message/message.entity';
import {
    UnableToBroadcastToTangleException,
    UnableToConnectToTangleNodeException,
    UnableToPrepareTangleTransferArrayException
} from '@api/core/iota/iota.exception';

export type IotaNet = 'mainnet' | 'devnet';

@Injectable()
export class IotaService {
    private readonly logger = new ExtendedLogger('IotaService');

    constructor(
        private readonly configService: ConfigService
    ) {
        this.connectToNode();
    }

    public async connectToNode(): Promise<void | GetNodeInfoResponse> {
        return this.composeIotaApi().getNodeInfo()
            .then((data: GetNodeInfoResponse) => {
                this.logger.info(`Connected to IOTA node at ${data.time} with ${data.neighbors} neighbor(s)`);

                return data;
            })
            .catch((error) => {
                throw new UnableToConnectToTangleNodeException();
            });
    }

    public async sendMessage(content: MessageContent, address: MessageAddress): Promise<void | readonly Transaction[]> {
        const trytes = await this.prepareMessage(content, address);
        return this.broadcastMessage(trytes);
    }

    private async prepareMessage(content: MessageContent, address: MessageAddress) {
        const iota: API = this.composeIotaApi();
        return iota.prepareTransfers(
            String(this.configService.get('IOTA_WALLET_SEED')),
            this.prepareTransfers(content, address)
        ).catch((error) => {
            throw new UnableToPrepareTangleTransferArrayException();
        });
    }

    private async broadcastMessage(trytes: readonly string[]): Promise<void | readonly Transaction[]> {
        const iota: API = this.composeIotaApi();
        return iota.sendTrytes(
            trytes,
            this.getDepth(),
            this.getMinimumWeightMagnitude()
        )
            .then((data: readonly Transaction[]) => {
                this.logger.info(`Broadcasted message to Tangle with bundle hash ${data[0].hash}`);

                return data;
            })
            .catch((error) => {
                throw new UnableToBroadcastToTangleException();
            });
    }

    private composeIotaApi(): API {
        const nodeUrl = this.configService.get('IOTA_NODE_URL');
        return composeAPI({
            provider: nodeUrl
        });
    }

    private prepareTransfers(content: MessageContent, address: MessageAddress) {
        const message = JSON.stringify({ 'message': content });
        const messageInTrytes = asciiToTrytes(message);
        return [{
            value: 0.0,
            message: messageInTrytes,
            address: address
        }];
    }

    private getDepth(): number {
        return 3;
    }

    private getMinimumWeightMagnitude(): number {
        const net = this.configService.get<IotaNet>('IOTA_NET') || 'devnet';

        return net === 'mainnet' ? 14 : 9;
    }
}
