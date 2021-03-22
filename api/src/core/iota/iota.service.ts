import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { API, composeAPI, GetNodeInfoResponse, Transaction } from '@iota/core';
import { asciiToTrytes } from '@iota/converter';

import { MessageAddress, MessageContent } from '@api/core/message/message.entity';

export type IotaNet = 'mainnet' | 'devnet';

@Injectable()
export class IotaService {
    private readonly logger: Logger = new Logger('IotaService');

    constructor(
        private readonly configService: ConfigService
    ) {
        this.connectToNode();
    }

    private composeIotaApi(): API {
        const nodeUrl = this.configService.get('IOTA_NODE_URL');
        return composeAPI({
            provider: nodeUrl
        });
    }

    public async connectToNode(): Promise<void> {
        const info: GetNodeInfoResponse = await this.composeIotaApi().getNodeInfo();
        this.logger.log(`Connected to IOTA node at ${info.time} with ${info.neighbors} neighbor(s)`);
    }

    public async sendMessage(content: MessageContent, address: MessageAddress): Promise<readonly Transaction[]> {
        const iota: API = await this.composeIotaApi();
        const trytes = await iota.prepareTransfers(
            String(this.configService.get('IOTA_WALLET_SEED')),
            this.prepareTransfers(content, address)
        );
        return iota.sendTrytes(
            trytes,
            this.getDepth(),
            this.getMinimumWeightMagnitude()
        );
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
        const net = this.configService.get('IOTA_NET') || 'devnet';

        return net === 'mainnet' ? 14 : 9;
    }
}
