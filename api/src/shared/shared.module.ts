import { Module } from '@nestjs/common';

import { ExtendedLogger } from '../core/utils/extended-logger';

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
export class SharedModule { }
