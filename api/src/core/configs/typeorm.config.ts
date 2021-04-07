import { ConfigService } from '@nestjs/config';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

/**
 * The configuration function for TypeORM and an instance of PostgreSQL.
 * @param configService The configuration service from the NestJS `ConfigModule`.
 * @returns An object usable by the TypeORM registration method in module imports.
 */
export function typeormConfig(configService: ConfigService): any {
    const isLocal: boolean = Boolean(configService.get('DB_HOST') === 'localhost');
    const extraOptions = isLocal ? { } : { ssl: { rejectUnauthorized: false }};

    return ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        extra: extraOptions,
        entities: ['@api/**/*.entity{.ts,.js}', 'dist/**/*.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true
    });
}
