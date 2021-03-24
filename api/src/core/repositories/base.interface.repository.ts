import { DeleteResult } from 'typeorm';

import { Id } from '@api/core/types/id.types';

/**
 * The base repository definition containing basic methods for CRUD operations.
 */
export interface BaseInterfaceRepository<T> {
    /**
     * Prepares an entity with a newly generated and correctly formatted ID.
     * @param data The data to use in creating a new entity.
     * @param identifiers Unique values to use in creating an ID.
     * @returns An entity with a new `id` property.
     */
    prepare(data: T, identifiers: string[]): T;

    /**
     * Creates and persist an entity to the database.
     * @param data The data to use in creating a new entity.
     * @returns A newly created and persisted entity.
     * @throws {@link EntityDataIsInvalidException} if no `id` property exists.
     * @throws {@link EntityAlreadyExistsException} if trying to create an entity with a non-unique ID.
     * @throws {@link UnableToCreateEntityException} if entity save operation fails for any other reason.
     */
    create(data: T): Promise<T | void>;

    /**
     * Finds all entities in the database.
     * @returns An array of entities.
     */
    findAll(): Promise<T[]>;

    /**
     * Finds an entity in the database with matching ID.
     * @param id The ID to use in finding the entity.
     * @returns An entity if found otherwise nothing.
     */
    findById(id: Id): Promise<T | undefined>;

    /**
     * Updates or creates (if doesn't exist) entity with matching ID and entity data.
     * @param id The ID to use in updating or creating an entity.
     * @param data The entity data to use in updating or creating an entity.
     * @returns An updated entity.
     */
    update(id: Id, data: T): Promise<T | void>;

    /**
     * Deletes an entity in the database with matching ID.
     * @param id The ID to use in finding the entity to delete.
     * @returns A deletion result object.
     */
    delete(id: Id): Promise<DeleteResult>;
}
