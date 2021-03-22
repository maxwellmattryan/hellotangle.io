import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import * as Joi from '@hapi/joi';

import { DatabaseModule } from '@api/core/database/database.module';
import { MessageModule } from '@api/core/message/message.module';

import { ApiController } from '@api/api.controller';

@Module({
    imports: [
        CacheModule.register({
            ttl: 60
        }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                IOTA_NET: Joi.string(),
                IOTA_NODE_URL: Joi.string().required(),
                IOTA_WALLET_SEED: Joi.string().required(),

                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASS: Joi.string().required(),
                DB_NAME: Joi.string().required(),

                DB_SOCKET_PATH: Joi.string(),
                DB_SSL_CA: Joi.string(),
                DB_SSL_CERT: Joi.string(),
                DB_SSL_KEY: Joi.string()
            })
        }),
        ThrottlerModule.forRoot({
            ttl: 60, limit: 20
        }),

        DatabaseModule,
        MessageModule
    ],
    controllers: [
        ApiController
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
})
export class ApiModule { }
