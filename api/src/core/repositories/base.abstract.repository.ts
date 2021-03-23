import { DeleteResult, Repository } from 'typeorm';

import { Id } from '@api/core/types/id.types';
import { createId } from '@api/utils/id.util';

import { PostgresErrors } from '@api/core/database/postgres.errors';
import {
    EntityAlreadyExistsException,
    EntityDataIsInvalidException,
    UnableToCreateEntityException
} from '@api/core/exceptions/base.entity.exceptions';
import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';

/**
 * Base repository implementation.
 */
export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    /**
     * Prepare an entity with a newly generated and correctly formatted ID.
     * @param data The data to use in creating a new entity.
     * @param identifiers Unique values to use in creating an ID.
     * @returns An entity with a new `id` property.
     */
    public prepare(data: T, identifiers: string[]): T {
        const id: Id = createId(identifiers.map(p => (data as any)[p]));
        return {
            ...data,
            id: id
        } as T;
    }

    /**
     * Create and persist an entity to the database.
     * @param data The data to use in creating a new entity.
     * @returns A newly created and persisted entity.
     * @throws {@link EntityDataIsInvalidException} if no `id` property exists.
     * @throws {@link EntityAlreadyExistsException} if trying to create an entity with a non-unique ID.
     * @throws {@link UnableToCreateEntityException} if entity save operation fails for any other reason.
     */
    public async create(data: T): Promise<T | void> {
        if(!('id' in data))
            throw new EntityDataIsInvalidException();

        return this.entity.save(data)
        .catch((error) => {
            if(error.code === PostgresErrors.UNIQUE_VIOLATION) {
                throw new EntityAlreadyExistsException();
            }

            throw new UnableToCreateEntityException();
        });
    }

    /**
     * Find all entities in the database.
     * @returns An array of entities.
     */
    public async findAll(): Promise<T[]> {
        return this.entity.find();
    }

    /**
     * Find an entity in the database with matching ID.
     * @param id The ID to use in finding the entity.
     * @returns An entity if found otherwise nothing.
     */
    public async findById(id: Id): Promise<T | undefined> {
        return this.entity.findOne(id);
    }

    /**
     * Update or create (if doesn't exist) entity with matching ID and entity data.
     * @param id The ID to use in updating or creating an entity.
     * @param data The entity data to use in updating or creating an entity.
     * @returns An updated entity.
     */
    public async update(id: Id, data: T): Promise<T | void> {
        return this.create(data);
    }

    /**
     * Delete an entity in the database with matching ID.
     * @param id The ID to use in finding the entity to delete.
     * @returns A deletion result object.
     */
    public async delete(id: Id): Promise<DeleteResult> {
        return this.entity.delete(id);
    }
}
