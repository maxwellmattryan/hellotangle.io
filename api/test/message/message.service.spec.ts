import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { IotaService } from '@api/iota/services/iota.service';

import { MessageDto } from '@api/message/dtos/message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MessageService } from '@api/message/services/message.service';

const fakeMessage = new MessageDto({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
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

    it('can send a message to the Tangle', () => {
        service.sendMessage(fakeMessage.content, fakeMessage.address)
        .then((data: Message) => {
            expect(data.hash).not.toEqual(fakeMessage.hash);

            expect(data).toHaveProperty('initiated_at');
            expect(data).toHaveProperty('attached_at');
            expect(Number(data.attached_at)).toBeGreaterThan(Number(data.initiated_at));
        })
        .catch((error) => { });
    });
});
