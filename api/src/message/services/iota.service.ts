import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { asciiToTrytes } from '@iota/converter';
import { API, composeAPI, GetNodeInfoResponse, Transaction } from '@iota/core';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';
import { ExtendedLogger } from '@api/utils/extended-logger';
import { Message } from '@api/message/entities/message.entity';
import { MessageAddress, MessageContent } from '@api/message/message.types';

import {
    UnableToBroadcastToTangleException,
    UnableToConnectToTangleNodeException,
    UnableToPrepareTangleTransferArrayException
} from '@api/message/exceptions/iota.exceptions';
import { IotaServiceInterface } from '@api/message/interfaces/iota.service.interface';

export type IotaNet = 'mainnet' | 'devnet';
export type IotaTransfer = { value: number, address: string, message: string };

/**
 * The IOTA service interface implementation for using the IOTA API.
 */
@Injectable()
export class IotaService extends BaseAbstractService<IotaService> implements IotaServiceInterface {
    private readonly logger = new ExtendedLogger('IotaService');

    constructor(
        private readonly configService: ConfigService
    ) {
        super();

        this.connectToNode();
    }

    /**
     * Refers to the amount of milestones to include in the node's tip-selection algorithm.
     * @returns The correct depth parameter value for the IOTA nets.
     * @internal
     */
    private depth = (): number => 3;

    /**
     * Refers to the amount of Proof of Work (PoW) needed to send transaction.
     * @returns The correct minumum weight magnitude parameter value for a specific IOTA net.
     * @internal
     */
    private minWeightMagnitude = (): number => {
        const net = this.configService.get<IotaNet>('IOTA_NET') || 'devnet';
        return net === 'mainnet' ? 14 : 9;
    }

    /**
     * Creates an instance of the IOTA API.
     * @returns IOTA API instance.
     * @internal
     */
    private composeIotaApi(): API {
        const nodeUrl = this.configService.get('IOTA_NODE_URL');
        return composeAPI({
            provider: nodeUrl
        });
    }

    /**
     * Connects to a node in the IOTA Tangle.
     * @returns Information about the node.
     * @throws {@link UnableToConnectToTangleNodeException} if server is unable to connect to an IOTA Tangle node.
     */
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

    /**
     * Sends a message via the IOTA protocol.
     * @param message The message data to use in the transaction.
     * @returns The message including newly updated fields (id, hash, attached_at).
     */
    public async sendMessage(message: Message): Promise<Message> {
        const trytes = await this.prepareMessage(message);
        const result = await this.broadcastMessage(trytes);

         return this.buildMessage(message, result);
    }

    /**
     * Encodes the message data to trytes.
     * @param message The message data to encode.
     * @returns An immutable array ("transfer array") of encoded strings.
     * @throws {@link UnableToPrepareTangleTransferArrayException} if transfer array was incorrectly initialized.
     * @internal
     */
    private async prepareMessage(message: Message): Promise<readonly string[]> {
        const iota: API = this.composeIotaApi();
        return iota.prepareTransfers(
            String(this.configService.get('IOTA_WALLET_SEED')),
            this.prepareTransfers(message.content, message.recipient_address)
        ).catch((error) => {
            throw new UnableToPrepareTangleTransferArrayException();
        });
    }

    /**
     * Initializes transfer array for transaction.
     * @param content The content to include in the message.
     * @param recipientAddress The address to send the message to.
     * @returns An array of transfer objects (holding data for value, message, and address).
     * @internal
     */
    private prepareTransfers(content: MessageContent, recipientAddress: MessageAddress): IotaTransfer[] {
        const message = JSON.stringify({ 'message': content });
        const messageInTrytes = asciiToTrytes(message);
        return [{
            value: 0.0,
            message: messageInTrytes,
            address: recipientAddress
        }];
    }

    /**
     * Broadcasts the prepared message to the IOTA Tangle.
     * @param trytes The encoded message data.
     * @returns An array of transaction data containing our message(s).
     * @throws {@link UnableToBroadcastToTangleException} if message was unable to be sent via IOTA protocol.
     * @internal
     */
    private async broadcastMessage(trytes: readonly string[]): Promise<readonly Transaction[]> {
        const iota: API = this.composeIotaApi();
        return iota.sendTrytes(
            trytes,
            this.depth(),
            this.minWeightMagnitude()
        )
            .then((data: readonly Transaction[]) => {
                this.logger.info(`Sent message to Tangle with hash of ${data[0].hash}`);

                return data;
            })
            .catch((error) => {
                throw new UnableToBroadcastToTangleException();
            });
    }

    /**
     * Appends a message with relevant data from a transaction.
     * @param message The message data used in the transaction.
     * @param txResult The transaction result to get data for fields 'hash' and 'attached_at'.
     * @returns Original message appended with relevant transaction data.
     * @internal
     */
    private buildMessage(message: Message, txResult: readonly Transaction[]): Message {
        return new Message({
            ...message,
            ...this.readTransaction(txResult[0])
        });
    }

    /**
     * Parses a transaction for relevant data.
     * @param tx The transaction to parse.
     * @returns Data partial with the message hash and attachment timestamp.
     * @internal
     */
    private readTransaction(tx: Transaction): Partial<Message> {
        return {
            hash: tx.hash,
            attached_at: new Date(tx.attachmentTimestamp)
        }
    }
}
