import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IotaService } from './services/iota.service';

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
