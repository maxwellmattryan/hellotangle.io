import { DeleteResult, Repository } from 'typeorm';

import { Id } from '@api/core/types/id.types';
import { createId } from '@api/utils/id.util';

import { PostgresErrors } from '@api/core/database/postgres.errors';
import { EntityAlreadyExistsException, EntityDataIsInvalid } from '@api/core/exceptions/base.entity.exceptions';
import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public prepare(data: T): T {
        const id: Id = createId([(data as any)['content']] || 'Sup');
        const now: Date = new Date(Date.now());
        return {
            ...data,
            id: id,
            initiated_at: now
        } as T;
    }

    public async create(data: T): Promise<T | void> {
        if(!('id' in data))
            throw new EntityDataIsInvalid();

        return this.entity.save(data)
        .catch((error) => {
            if(error.code === PostgresErrors.UNIQUE_VIOLATION) {
                throw new EntityAlreadyExistsException();
            }
        });
    }

    public async findAll(): Promise<T[]> {
        return this.entity.find();
    }

    public async findById(id: Id): Promise<T | undefined> {
        return this.entity.findOne(id);
    }

    public async update(id: Id, data: T): Promise<T | void> {
        return this.create(data);
    }

    public async delete(id: Id): Promise<DeleteResult> {
        return this.entity.delete(id);
    }
}
