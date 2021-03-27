import { EntityIsImmutableException } from '@api/core/exceptions/base.entity.exceptions';
import { Id } from '@api/core/types/id.types';
import { Message } from '@api/message/entities/message.entity';
import { UnableToCreateMessageException } from '@api/message/exceptions/message.exceptions';

export const FakeMessage = new Message({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    recipient_address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

export function MessageRepositoryMock(message: Message): any {
    return {
        prepare: jest.fn((data: Message) =>
            new Message({ ...data, ...message, initiated_at: new Date(Date.now()) })
        ),
        create: jest.fn((data: Message) => {
            const keys = ['hash', 'recipient_address'];
            keys.forEach(k => {
                if((data as any)[k] === (message as any)[k])
                    throw new UnableToCreateMessageException();
            })

            return Promise.resolve(new Message({ ...data }));
        }),
        findAll: jest.fn().mockResolvedValue(
            Promise.resolve([message])
        ),
        findById: jest.fn((id: Id) =>
            Promise.resolve(id === message.id ? message : undefined)
        ),
        update: jest.fn((id: Id, data: Message) => {
            throw new EntityIsImmutableException();
        }),
        delete: jest.fn((id: Id) => {
            throw new EntityIsImmutableException();
        })
    }
}
