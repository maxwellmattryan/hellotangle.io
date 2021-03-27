import { ExtendedLogger } from '@api/core/extended-logger';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheInterceptor, CacheModule, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as Joi from '@hapi/joi';

import { typeormConfig } from '@api/core/configs/typeorm.config';
import { HttpExceptionFilter } from '@api/core/http/http-exception.filter';
import { HttpLogger } from '@api/core/http/http.logger';

/**
 * The core module containing mostly boilerplate components for the API (i.e. caching, config, rate limiting, loggers, filters, database setup).
 */
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
                DB_SSL_KEY: Joi.string(),

                API_RATE_LIMIT: Joi.string().required()
            })
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: Number(process.env.API_RATE_LIMIT)
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => typeormConfig(configService)
        })
    ],
    exports: [
        ExtendedLogger
    ],
    providers: [
        ExtendedLogger,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HttpLogger).forRoutes('*');
    }
}
