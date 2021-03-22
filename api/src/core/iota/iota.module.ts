import { Module } from '@nestjs/common';

import { IotaService } from './iota.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    exports: [
        IotaService
    ],
    controllers: [],
    providers: [
        IotaService
    ]
})
export class IotaModule { }