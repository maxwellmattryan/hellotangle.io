import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { Id } from '@api/core/types/id.types';

import { MessageHash, MessageContent, MessageAddress } from '@api/message/message.types';

@Entity('messages')
export class Message {
    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar', length: 64, unique: true, nullable: false })
    public id: Id = '';

    @Column({ type: 'varchar', length: 256, unique: false, nullable: false })
    public content: MessageContent = '';

    @Column({ type: 'varchar', length: 90, unique: true, nullable: false })
    public recipient_address: MessageAddress = '';

    @Column({ type: 'varchar', length:  81, unique: true, nullable: true })
    public hash?: MessageHash;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()', nullable: false })
    public initiated_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    public attached_at?: Date;
}
