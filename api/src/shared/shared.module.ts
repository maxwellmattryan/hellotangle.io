import { Module } from '@nestjs/common';

import { ExtendedLogger } from '@api/core/utils/extended-logger';

@Module({
    exports: [
        ExtendedLogger
    ],
    providers: [
        ExtendedLogger
    ]
})
export class SharedModule { }
