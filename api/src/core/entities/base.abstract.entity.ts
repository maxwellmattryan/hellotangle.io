import { validateOrReject } from 'class-validator';
import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';

import { BaseInterfaceEntity } from '@api/core/entities/base.interface.entity';

export abstract class BaseAbstractEntity<T> extends BaseEntity implements BaseInterfaceEntity<T> {
    /**
     * Validates entity data before being inserted or updated.
     * @internal
     */
    @BeforeInsert()
    @BeforeUpdate()
    async validate(): Promise<void> {
        console.log("VALIDATING");
        await validateOrReject(this);
    }
}