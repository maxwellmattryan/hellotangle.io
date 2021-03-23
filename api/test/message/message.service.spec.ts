import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IotaService } from '@api/iota/services/iota.service';
import { Message } from '@api/message/entities/message.entity';
import { MessageRepository } from '@api/message/repositories/message.repository';
import { MessageService } from '@api/message/services/message.service';

import { FakeMessage, MessageRepositoryMock } from '@test/message/message.repository.mock';

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
                    useValue: MessageRepositoryMock(FakeMessage)
                }
            ]
        }).compile();

        service = module.get<MessageService>(MessageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can send a message to the Tangle', () => {
        service.sendMessage(FakeMessage)
            .then((data: Message) => {
                expect(data.hash).not.toEqual(FakeMessage.hash);

                expect(data).toHaveProperty('initiated_at');
                expect(data).toHaveProperty('attached_at');
                expect(Number(data.attached_at)).toBeGreaterThan(Number(data.initiated_at));
            })
            .catch((error) => { });
    });
});
