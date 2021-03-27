import { BaseInterfaceService } from '@web/core/services/base.interface.service';

/**
 * The base service implementation.
 */
export abstract class BaseAbstractService<T> implements BaseInterfaceService<T> {
    protected constructor() { }
}
