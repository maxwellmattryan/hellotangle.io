import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { IOTA_SERVICE } from '@api/message/interfaces/iota.service.interface';
import { IotaService } from '@api/message/services/iota.service';
import { Message } from '@api/message/entities/message.entity';
import { MESSAGE_REPOSITORY } from '@api/message/interfaces/message.repository.interface';
import { MESSAGE_SERVICE } from '@api/message/interfaces/message.service.interface';
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
                    provide: IOTA_SERVICE,
                    useClass: IotaService
                },
                {
                    provide: MESSAGE_REPOSITORY,
                    useClass: MessageRepository
                },
                {
                    provide: MESSAGE_SERVICE,
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
            .then((data: Message | void) => {
                data = (data as Message);

                expect(data.hash).not.toEqual(FakeMessage.hash);

                expect(data).toHaveProperty('initiated_at');
                expect(data).toHaveProperty('attached_at');
                expect(Number(data.attached_at)).toBeGreaterThan(Number(data.initiated_at));
            })
            .catch((error) => { });
    });
});
