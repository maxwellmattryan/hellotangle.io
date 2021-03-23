import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IotaService } from '@api/iota/services/iota.service';
import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MessageService } from '@api/message/services/message.service';
import { IotaModule } from '@api/iota/iota.module';
import { MessageRepository } from '@api/message/repositories/message.repository';

const fakeMessage = new SendMessageDto({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    recipient_address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

describe('MessageService', () => {
    let service: MessageService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
            ],
            providers: [
                IotaService,
                MessageRepository,
                MessageService,
                {
                    provide: 'IotaServiceInterface',
                    useClass: IotaService
                },
                {
                    provide: 'MessageRepositoryInterface',
                    useClass: MessageRepository
                },
                {
                    provide: 'MessageServiceInterface',
                    useClass: MessageService
                },
                {
                    provide: getRepositoryToken(Message),
                    useValue: {
                        create: jest.fn().mockResolvedValue(fakeMessage),
                        save: jest.fn().mockResolvedValue(fakeMessage),
                        findAll: jest.fn().mockResolvedValue([fakeMessage]),
                        findById: jest.fn().mockResolvedValue(fakeMessage),
                    }
                }
            ]
        }).compile();

        service = module.get<MessageService>(MessageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can send a message to the Tangle', () => {
        service.sendMessage(fakeMessage)
        .then((data: Message) => {
            expect(data.hash).not.toEqual(fakeMessage.hash);

            expect(data).toHaveProperty('initiated_at');
            expect(data).toHaveProperty('attached_at');
            expect(Number(data.attached_at)).toBeGreaterThan(Number(data.initiated_at));
        })
        .catch((error) => { });
    });
});
