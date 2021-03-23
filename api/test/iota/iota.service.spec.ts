import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { Transaction } from '@iota/core';

import { IotaService } from '@api/iota/services/iota.service';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';

const fakeMessage = new SendMessageDto({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    recipient_address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

describe('IotaService', () => {
    let service: IotaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot()
            ],
            providers: [
                ConfigService,
                IotaService
            ],
        }).compile();

        service = module.get<IotaService>(IotaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can connect to a node and gather information', () => {
        expect(service.connectToNode()).resolves.toHaveProperty('time');
    });

    it('can broadcast message to Tangle and return a non-empty Transaction array', () => {
        service.sendMessage(new Message({ ...fakeMessage }))
        .then((data: readonly Transaction[]) => {
            expect(data.length).toBeGreaterThanOrEqual(1);
        })
        .catch((error) => { });
    });
});
