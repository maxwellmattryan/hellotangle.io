import { DeleteResult, UpdateResult } from 'typeorm';

import { Id } from '@api/core/types/id.types';

export interface BaseInterfaceRepository<T> {
    create(data: T): Promise<T>;
    save(data: T): Promise<T>;

    findAll(): Promise<T[]>;
    findById(id: Id): Promise<T | undefined>;

    update(id: Id, data: T): Promise<UpdateResult>;

    delete(id: Id): Promise<DeleteResult>;
}
