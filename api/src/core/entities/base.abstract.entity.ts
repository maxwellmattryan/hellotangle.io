import { validateOrReject } from 'class-validator';
import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';

import { EntityDataIsInvalidException } from '@api/core/exceptions/base.entity.exceptions';

import { BaseInterfaceEntity } from '@api/core/entities/base.interface.entity';

export abstract class BaseAbstractEntity<T> extends BaseEntity implements BaseInterfaceEntity<T> {
    /**
     * Validates entity data before being inserted or updated.
     * @throws {@link EntityValidationFailedException} if entity validation fails.
     * @internal
     */
    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this)
            .catch((error) => {
                throw new EntityDataIsInvalidException();
            });
    }
}
