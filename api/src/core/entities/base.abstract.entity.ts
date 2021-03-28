import { validateOrReject } from 'class-validator';
import { BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';

import { EntityDataIsInvalidException } from '@api/core/exceptions/base.entity.exceptions';

import { BaseInterfaceEntity } from '@api/core/entities/base.interface.entity';

export abstract class BaseAbstractEntity<T> extends BaseEntity implements BaseInterfaceEntity<T> {
    /**
     * Validates entity data before being inserted or updated.
     * @throws {@link EntityDataIsInvalidException} if entity data validation fails.
     * @internal
     */
    @BeforeInsert()
    @BeforeUpdate()
    private validate(): Promise<void> {
        return validateOrReject(this)
            .catch((error) => {
                const errorKeys = Object.keys(error[0].constraints);
                throw new EntityDataIsInvalidException(error[0].constraints[errorKeys[0]]);
            });
    }
}
