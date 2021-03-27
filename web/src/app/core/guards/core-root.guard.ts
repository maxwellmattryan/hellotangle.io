import { InjectionToken } from '@angular/core';

import { Guard } from '@web/core/guards/guard';

/**
 * The injection token for the core root guard, which makes sure that it is only registered once.
 */
export const CORE_ROOT_GUARD = new InjectionToken<void>('Internal Core forRoot Guard');

/**
 * The core root guard factory, which ensures that the module was only registered once.
 */
export function coreRootGuardFactory(): Guard {
    return 'guarded';
}
