import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { Id } from '@api/core/types/id.type';

export type MessageContent = string;
export type MessageBundleHash = string;

@Entity('message')
export class Message {
    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }

    @PrimaryColumn({ type: 'varchar', length: 64, unique: true, nullable: false })
    public id: Id = '';

    @Column({ type: 'varchar', length: 512, unique: false, nullable: false })
    public content: MessageContent = '';

    @Column({ type: 'varchar', length:  81, unique: true, nullable: true })
    public bundle_hash?: MessageBundleHash;

    @CreateDateColumn({ type: 'timestamp', default: () => 'now()' })
    public initiated_at?: Date;

    @Column({ type: 'timestamp', default: () => 'now()', onUpdate: 'now()' })
    public sent_at?: Date;
}
