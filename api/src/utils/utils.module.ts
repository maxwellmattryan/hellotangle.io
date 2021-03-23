import { Module } from '@nestjs/common';

import { ExtendedLogger } from '@api/utils/extended-logger';

@Module({
    exports: [
        ExtendedLogger
    ],
    providers: [
        ExtendedLogger
    ]
})
export class UtilsModule { }
