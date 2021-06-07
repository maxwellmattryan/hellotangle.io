import { DeleteResult, Repository } from 'typeorm';

import { PostgresErrors } from '@api/core/database/postgres.errors';
import { EntityAlreadyExistsException, EntityDataIsInvalidException } from '@api/core/exceptions/base.entity.exceptions';
import { BaseInterfaceRepository } from '@api/core/repositories/base.interface.repository';
import { Id } from '@api/core/types/id.types';
import { createId } from '@api/core/utils/id.util';

/**
 * The base repository implementation containing basic methods for CRUD operations.
 */
export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    /**
     * Prepares an entity with a newly generated and correctly formatted ID.
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
     * Creates and persists an entity to the database.
     * @param data The data to use in creating a new entity.
     * @returns A newly created and persisted entity.
     * @throws {@link EntityAlreadyExistsException} if trying to create an entity with a non-unique ID.
     * @throws {@link EntityDataIsInvalidException} if entity data contains missing or invalid values.
     * @throws {@link UnableToCreateEntityException} if entity save operation fails for any other reason.
     */
    public async create(data: T): Promise<T | void> {
        if(!('id' in data) || !(data as any)['id'])
            data = this.prepare(data, []);

        return this.entity.save(data)
            .catch((error) => {
                switch(error.code) {
                    case PostgresErrors.UNIQUE_VIOLATION:
                        throw new EntityAlreadyExistsException();

                    case PostgresErrors.NOT_NULL_VIOLATION:
                        throw new EntityDataIsInvalidException();
                }

                throw error;
            });
    }

    /**
     * Finds all entities in the database.
     * @returns An array of entities.
     */
    public async findAll(): Promise<T[]> {
        return this.entity.find();
    }

    /**
     * Finds an entity in the database with matching ID.
     * @param id The ID to use in finding the entity.
     * @returns An entity if found otherwise nothing.
     */
    public async findById(id: Id): Promise<T | undefined> {
        return this.entity.findOne(id);
    }

    /**
     * Updates or creates (if doesn't exist) entity with matching ID and entity data.
     * @param id The ID to use in updating or creating an entity.
     * @param data The entity data to use in updating or creating an entity.
     * @returns An updated entity.
     */
    public async update(id: Id, data: T): Promise<T | void> {
        return this.create(data);
    }

    /**
     * Deletes an entity in the database with matching ID.
     * @param id The ID to use in finding the entity to delete.
     * @returns A deletion result object.
     */
    public async delete(id: Id): Promise<DeleteResult> {
        return this.entity.delete(id);
    }
}
