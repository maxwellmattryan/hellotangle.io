import { IsAlphanumeric, IsDate, IsDefined, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { BaseAbstractEntity } from '@api/core/entities/base.abstract.entity';
import { MessageHash, MessageContent, MessageAddress } from '@api/message/types/message.types';
import { MessageEntityInterface } from '@api/message/interfaces/message.entity.interface';
import { Id } from '@api/core/types/id.types';

/**
 * The message entity class containing all relevant properties for IOTA protocol messages.
 */
@Entity('messages')
export class Message extends BaseAbstractEntity<Message> implements MessageEntityInterface {
    constructor(partial: Partial<Message>) {
        super();

        Object.assign(this, partial);
    }

    /**
     * The ID of a message, which __must__ be a unique alphanumeric string of exactly 64 characters and __must__ exist to be used in code and persisted in the database.
     * @property type VARCHAR
     * @property length 64
     * @property unique true
     * @property nullable false
     */
    @IsString()
    @IsAlphanumeric()
    @MinLength(64)
    @MaxLength(64)
    @IsDefined()
    @PrimaryColumn({ type: 'varchar', length: 64, unique: true, nullable: false })
    public id: Id = '';

    /**
     * The content of a message, which __must__ be an ASCII string of at least one character and no more than 256 characters and __must__ exist to be used in code and persisted in the database.
     * @property type VARCHAR
     * @property length 256
     * @property unique false
     * @property nullable false
     */
    @IsString()
    @MaxLength(256)
    @IsDefined()
    @Column({ type: 'varchar', length: 256, unique: false, nullable: false })
    public content: MessageContent = '';

    /**
     * The receipient address of a message, which __must__ be an alphanumeric string of exactly 90 characters and __must__ exist to be used in code and persisted in the database.
     * @property type VARCHAR
     * @property length 90
     * @property unique false
     * @property nullable false
     */
    @IsString()
    @IsAlphanumeric()
    @MinLength(90)
    @MaxLength(90)
    @IsDefined()
    @Column({ type: 'varchar', length: 90, unique: false, nullable: false })
    public recipient_address: MessageAddress = '';

    /**
     * The transaction hash of a message, which __must__ be a unique alphanumeric string of exactly 81 characters and __must__ exist to be persisted in the database.
     * @property type VARCHAR
     * @property length 90
     * @property unique true
     * @property nullable false
     */
    @IsString()
    @IsAlphanumeric()
    @MinLength(81)
    @MaxLength(81)
    @IsDefined()
    @Column({ type: 'varchar', length:  81, unique: true, nullable: false })
    public hash?: MessageHash;

    /**
     * The timestamp that a message was initiated at, which __must__ exist to be persisted in the database.
     * @property type TIMESTAMP
     * @property default now
     * @property nullable false
     */
    @IsDate()
    @IsDefined()
    @CreateDateColumn({ type: 'timestamp', default: () => 'now()', nullable: false })
    public initiated_at?: Date;

    /**
     * The timestamp that a message was attached to the IOTA Tangle, which __must__ exist to be persisted in the database.
     * @property type TIMESTAMP
     * @property nullable false
     */
    @IsDate()
    @IsDefined()
    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    public attached_at?: Date;
}
