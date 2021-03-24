import { Module } from '@nestjs/common';

import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The utilities module containing things that are useful throughout the app like logging or generating IDs.
 */
@Module({
    exports: [
        ExtendedLogger
    ],
    providers: [
        ExtendedLogger
    ]
})
export class UtilsModule { }
