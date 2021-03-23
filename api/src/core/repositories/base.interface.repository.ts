import { DeleteResult } from 'typeorm';

import { Id } from '@api/core/types/id.types';

export interface BaseInterfaceRepository<T> {
    create(data: T): Promise<T | void>;
    save(data: T): Promise<T | void>;

    findAll(): Promise<T[]>;
    findById(id: Id): Promise<T | undefined>;

    update(id: Id, data: T): Promise<T | void>;

    delete(id: Id): Promise<DeleteResult>;
}
