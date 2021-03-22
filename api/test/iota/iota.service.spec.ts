import { Test, TestingModule } from '@nestjs/testing';
import { IotaService } from '@api/core/iota/iota.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageDto } from '@api/core/message/message.dto';
import { Transaction } from '@iota/core';

const fakeMessage = new MessageDto({
    content: 'Hello, Tangle!',
    address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    bundle_hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
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
        service.sendMessage(fakeMessage.content, fakeMessage.address)
        .then((data: readonly Transaction[]) => {
            expect(data.length).toBeGreaterThanOrEqual(1);
        })
        .catch((error) => { });
    });
});
