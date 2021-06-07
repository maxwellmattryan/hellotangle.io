import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BaseAbstractService } from '@api/core/services/base.abstract.service';
import { IotaServiceInterface } from '@api/message/interfaces/iota.service.interface';
import { ExtendedLogger } from '@api/core/extended-logger';
import { Message } from '@api/message/entities/message.entity';
import { NodeInfoWrapper } from "@iota/client/lib/types";
import { Client } from "@iota/client";

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const { ClientBuilder } = require('@iota/client');

/**
 * The IOTA service interface implementation for using the IOTA API.
 */
@Injectable()
export class IotaService extends BaseAbstractService<IotaService> implements IotaServiceInterface {
    private readonly logger = new ExtendedLogger('IotaService');

    private readonly client: Client;

    constructor(private readonly configService: ConfigService) {
        super();

        this.client = this.initializeNodeClient();
    }

    /**
     * Initializes the node client for communicating with the Tangle.
     * @returns The newly created client connected to the node URL defined in the env.
     * @internal
     */
    private initializeNodeClient(): Client {
        return new ClientBuilder()
            .node(this.configService.get('NODE_URL'))
            .build();
    }

    /**
     * Sends a message via the IOTA protocol.
     * @param message The message data to use in the transaction.
     * @returns The message including newly updated fields `hash` and `attached_at`.
     */
    public async sendMessage(message: Message): Promise<Message> {
        await this.connectToNode();

        const { messageId } = await this.client.message()
            .index(message.recipient_address)
            .data(message.content)
            .submit();

        this.logger.info(`Sent message to IOTA Tangle with hash of ${messageId}`);

        return new Message({
            ...message,
            hash: messageId,
            attached_at: new Date(Date.now())
        });
    }

    /**
     * Connect to a node in the IOTA Tangle.
     * @returns Information about the node.
     */
    private async connectToNode(): Promise<void> {
        this.client.getInfo()
            .then((data: NodeInfoWrapper) => {
                this.logger.info(`Connected to Tangle node: ${data.nodeinfo.name} - ${data.nodeinfo.version} - ${data.url}`);
            })
            .catch((err: unknown) => {
                this.logger.error(String(err));
            });
    }
}
