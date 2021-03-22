import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IotaService } from '@api/core/iota/iota.service';

import { MessageDto } from '@api/core/message/message.dto';
import { Message } from '@api/core/message/message.entity';
import { MessageService } from '@api/core/message/message.service';

const fakeMessage = new MessageDto({
    content: 'Hello, Tangle!',
    address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    bundle_hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot()
            ],
            providers: [
                IotaService,
                MessageService,
                {
                    provide: getRepositoryToken(Message),
                    useValue: {
                        create: jest.fn().mockResolvedValue(fakeMessage)
                    }
                }
            ]
        }).compile();

        service = module.get<MessageService>(MessageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a message to be sent to the Tangle', () => {
            const message = service.create(fakeMessage.content, fakeMessage.address);
            expect(message.content).toEqual(fakeMessage.content);
        });
    });
});
