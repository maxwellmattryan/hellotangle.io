import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { MessageDto } from '@api/core/message/message.dto';
import { Message } from '@api/core/message/message.entity';
import { MessageRepository } from '@api/core/message/message.repository';

const fakeMessage = new MessageDto({
    id: '8ZHLGUVD3JNM9NVRWND567QLZ0V14PLT0UE93K4SB6BR50MS2B4Z086WD598VHBE',
    content: 'Hello, Tangle!',
    address: 'ILOLJ8V08OVJDVJD3PH1KIA2U6XFCZWRNI6KW65E04MBV3G33UUFSY00102QC99Q',
    bundle_hash: 'ZWEIAGQKKDIBZBFQCUSZDNSNVYEBMJXWPLYUEOHVC9L9KSJMHKPW9BOFHO9NQKFQSZXVPQIBH9RJLY999',
});

describe('MessageRepository', () => {
    let repository = new MessageRepository();

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('can create a message to be sent to the Tangle', () => {
        const message = repository.createMessage(fakeMessage.content, fakeMessage.address)
        .then((data: Message) => {
            expect(data.content).toEqual(fakeMessage.content);
        })
        .catch((error) => { });
    });

    it('can save a message to the database', () => {
        repository.saveMessage(new Message({ ...fakeMessage }))
        .then((data: Message) => {
            expect(data.bundle_hash).toEqual(fakeMessage.bundle_hash);
        })
        .catch((error) => { });
    });
});
