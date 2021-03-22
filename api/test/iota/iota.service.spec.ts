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

    describe('connectToNode', () => {
        it('should return appropriate node information', () => {
            expect(service.connectToNode()).resolves.toBeDefined();
        });
    });

    
    describe('sendMessage', () => {
        it('should broadcast message to Tangle and return Transaction array', () => {
            service.sendMessage(fakeMessage.content, fakeMessage.address)
                .then((data: void | readonly Transaction[]) => {
                    console.log("DATA: ", data);
                    expect(data).toBeDefined();
                })
                .catch((error: unknown) => console.log("ERROR: ", error));
        });
    });
});
