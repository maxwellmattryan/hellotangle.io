import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Id } from '@api/core/types/id.types';
import { createId } from '@api/core/utils/id.util';

import { BaseInterfaceRepository } from './base.interface.repository';
import { PostgresErrors } from '@api/core/database/postgres.errors';
import { EntityAlreadyExistsException } from '@api/core/exceptions/base.entity.exceptions';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async create(data: T): Promise<T | void> {
        const id: Id = createId([(data as any)['content']] || 'Sup');
        const now: Date = new Date(Date.now());

        return this.save({ ...data, id: id, initiated_at: now });
    }

    public async save(data: T): Promise<T | void> {
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
        return this.save(data);
    }

    public async delete(id: Id): Promise<DeleteResult> {
        return this.entity.delete(id);
    }
}
