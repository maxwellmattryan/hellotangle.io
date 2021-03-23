import { Module } from '@nestjs/common';

import { ExtendedLogger } from '@api/core/utils/extended-logger';

@Module({
    imports: [],
    exports: [
        ExtendedLogger
    ],
    controllers: [],
    providers: [
        ExtendedLogger
    ]
})
export class UtilsModule { }
