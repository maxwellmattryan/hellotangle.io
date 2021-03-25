import { HttpExceptionFilter } from '@api/core/http/http-exception.filter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from '@api/core/configs/typeorm.config';
import { HttpLogger } from '@api/core/http/http.logger';
import { ExtendedLogger } from '@api/utils/extended-logger';

/**
 * The core module containing mostly boilerplate components for the API (i.e. loggers, filters, database setup).
 */
@Module({
    imports: [
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
        }
    ]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HttpLogger).forRoutes('*');
    }
}
