import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import * as Joi from '@hapi/joi';

import { CoreModule } from '@api/core/core.module';
import { IotaModule } from '@api/iota/iota.module';
import { MessageModule } from '@api/message/message.module';
import { SharedModule } from '@api/shared/shared.module';

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

        CoreModule,
        IotaModule,
        MessageModule,
        SharedModule
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
