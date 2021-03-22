import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionLogger } from './http-exception.logger';

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionLogger
        }
    ]
})
export class HttpModule { }
