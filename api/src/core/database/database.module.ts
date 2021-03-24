import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from '@api/core/database/config/typeorm.config';

/**
 * The database module containing mostly the TypeORM registration for the API.
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => typeormConfig(configService)
        })
    ]
})
export class DatabaseModule { }
