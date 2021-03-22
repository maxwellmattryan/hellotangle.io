import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Message } from '@api/core/message/message.entity';
import { MessageService } from '@api/core/message/message.service';

const fakeMessage = new Message({
    content: 'Hello, Tangle!'
});

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
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
        it('should create a message for the Tangle', () => {
            service.create(fakeMessage.content).then((data: Message) =>
                expect(data.content).toEqual(fakeMessage.content)
            );
        });
    });
});
