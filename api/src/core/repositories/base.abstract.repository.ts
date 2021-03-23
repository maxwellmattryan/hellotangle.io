import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Id } from '@api/core/types/id.types';
import { createId } from '@api/core/utils/id.util';

import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async create(data: T): Promise<T> {
        const id: Id = createId([(data as any)['content']]);
        return this.save({ id: id, ...data });
    }

    public async save(data: T): Promise<T> {
        return this.entity.save(data);
    }

    public async findAll(): Promise<T[]> {
        return this.entity.find();
    }

    public async findById(id: Id): Promise<T | undefined> {
        return this.entity.findOne(id);
    }

    public async update(id: Id, data: T): Promise<UpdateResult> {
        return this.entity.update(id, data);
    }

    public async delete(id: Id): Promise<DeleteResult> {
        return this.entity.delete(id);
    }
}
