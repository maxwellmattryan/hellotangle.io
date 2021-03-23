import { BaseInterfaceService } from '@api/core/services/base.interface.service';

/**
 * Base service implementation.
 */
export abstract class BaseAbstractService<T> implements BaseInterfaceService<T> {
    protected constructor() { }
}
