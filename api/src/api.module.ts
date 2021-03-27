import { Module } from '@nestjs/common';

import { ApiController } from '@api/api.controller';
import { CoreModule } from '@api/core/core.module';
import { MessageModule } from '@api/message/message.module';

/**
 * The main module containing most of the API's configuration for things like caching, rate limiting, environment variables, etc.
 * It ties the entire application together by importing all of the modules here.
 */
@Module({
    imports: [
        CoreModule,
        MessageModule
    ],
    controllers: [
        ApiController
    ],
})
export class ApiModule { }
