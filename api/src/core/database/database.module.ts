import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const socketPath = configService.get('DB_SOCKET_PATH');
                const sslOptions = socketPath ? {
                    rejectUnauthorized: false,
                    ca: Buffer.from(String(configService.get('DB_SSL_CA')), 'base64').toString('ascii'),
                    cert: Buffer.from(String(configService.get('DB_SSL_CERT')), 'base64').toString('ascii'),
                    key: Buffer.from(String(configService.get('DB_SSL_KEY')), 'base64').toString('ascii'),
                } : { };
                const extraOptions = socketPath ? { socketPath: socketPath, ssl: sslOptions } : { };

                return ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    extra: extraOptions,
                    entities: [
                        __dirname + '/../../core/**/*.entity{.ts,.js}',
                        __dirname + '/../../modules/**/*.entity{.ts,.js}'
                    ],
                    namingStrategy: new SnakeNamingStrategy(),
                    synchronize: true
                });
            }
        })
    ]
})
export class DatabaseModule { }
