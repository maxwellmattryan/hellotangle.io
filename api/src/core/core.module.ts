import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './database/config/typeorm.config';
import { HttpExceptionLogger } from '@api/core/http/http-exception.logger';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => typeormConfig(configService)
        })
    ],
    exports: [],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionLogger
        }
    ]
})
export class CoreModule { }
