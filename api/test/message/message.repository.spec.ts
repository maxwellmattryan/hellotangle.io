import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { EntityIsImmutableException } from '@api/core/exceptions/base.entity.exceptions';
import { Message } from '@api/message/entities/message.entity';
import { MessageRepository } from '@api/message/repositories/message.repository';
import { UnableToCreateMessageException } from '@api/message/exceptions/message.exceptions';

import { FakeMessage, MessageRepositoryMock } from '@test/message/message.repository.mock';

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
                    useValue: MessageRepositoryMock(FakeMessage)
                }
            ]
        }).compile();

        repository = module.get<MessageRepository>(MessageRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('prepare', () => {
        it('should prepare a message to be sent to the Tangle', () => {
            const message = repository.prepare({
                content: FakeMessage.content,
                recipient_address: FakeMessage.recipient_address,
                initiated_at: new Date(Date.now())
            } as Message, [FakeMessage.content as string, FakeMessage.recipient_address]);

            expect(message).toHaveProperty('id');
            expect(message).toHaveProperty('content');
            expect(message).toHaveProperty('recipient_address');
            expect(message).toHaveProperty('initiated_at');
        });
    });

    describe('create', () => {
        it('should save a message to the database using a valid ID', () => {
            repository.create(new Message({
                id: 'NEW_ID',
                content: 'Hello, Tangle!',
                hash: 'NEW_HASH',
                recipient_address: 'NEW_RECIPIENT_ADDRESS'
            }))
                .then((data): Message | void => {
                    expect((data as Message)).not.toEqual(FakeMessage);
                })
                .catch((error) => { });
        });

        it('should throw an error trying to save one with same id, recipient_address, or hash.', () => {
            expect(() => {
                repository.create(new Message({ ...FakeMessage }))
            }).toThrow(UnableToCreateMessageException);
        });
    });

    describe('findAll', () => {
        it('should find all messages in the database', () => {
            repository.findAll()
                .then((data: Message[]) => {
                    expect(data[0]).toEqual(FakeMessage);
                })
                .catch((error) => { });
        });
    });

    describe('findById', () => {
        it('should return message using a valid ID', () => {
            repository.findById(FakeMessage.id)
                .then((data: Message | undefined) => {
                    expect(data).toBeDefined();
                    expect(data).toEqual(FakeMessage);
                })
                .catch((error) => { });
        });

        it('should return undefined using an invalid ID', () => {
            repository.findById('1')
                .then((data: Message | undefined) => {
                    expect(data).toBeUndefined();
                    expect(data).not.toEqual(FakeMessage);
                })
                .catch((error) => { });
        });
    });

    describe('update', () => {
        it('should never allow for an update', () => {
            expect(() => {
                repository.update(FakeMessage.id, FakeMessage);
            }).toThrow(EntityIsImmutableException);
        });
    });

    describe('delete', () => {
        it('should never allow for a delete', () => {
            expect(() => {
                repository.delete(FakeMessage.id);
            }).toThrow(EntityIsImmutableException);
        });
    });
});
