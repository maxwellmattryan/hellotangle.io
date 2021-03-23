import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SendMessageDto } from '@api/message/dtos/send-message.dto';
import { Message } from '@api/message/entities/message.entity';
import { MessageRepository } from '@api/message/repositories/message.repository';

const fakeMessage = new SendMessageDto({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    recipient_address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

describe('MessageRepository', () => {
    let repository: MessageRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot()
            ],
            providers: [
                MessageRepository,
                {
                    provide: 'MessageRepositoryInterface',
                    useClass: MessageRepository
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

        repository = module.get<MessageRepository>(MessageRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('can create a message to be sent to the Tangle', () => {
        const message = repository.create(new Message({ ...fakeMessage }))
        .then((data): Message | void => {
            expect((data as Message).content).toEqual(fakeMessage.content);
        })
        .catch((error) => { });
    });

    it('can save a message to the database', () => {
        repository.save(new Message({ ...fakeMessage }))
        .then((data): Message | void => {
            expect((data as Message).hash).toEqual(fakeMessage.hash);
        })
        .catch((error) => { });
    });
});
