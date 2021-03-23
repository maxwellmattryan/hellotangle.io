import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IOTA_SERVICE } from '@api/iota/interfaces/iota.service.interface';
import { IotaService } from '@api/iota/services/iota.service';

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    exports: [
        IotaService
    ],
    providers: [
        IotaService,
        // {
        //     provide: IOTA_SERVICE,
        //     useClass: IotaService
        // }
    ]
})
export class IotaModule { }
