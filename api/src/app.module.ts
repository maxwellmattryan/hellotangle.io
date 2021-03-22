import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import * as Joi from '@hapi/joi';

import { DatabaseModule } from '@api/core/database/database.module';

import { AppController } from './app.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
    imports: [
        CacheModule.register({
            ttl: 60
        }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
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

        DatabaseModule
    ],
    controllers: [
        AppController
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
export class AppModule { }
