import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IOTA_SERVICE } from '@api/message/interfaces/iota.service.interface';
import { IotaService } from '@api/message/services/iota.service';
import { MessageController } from '@api/message/controllers/message.controller';
import { Message } from '@api/message/entities/message.entity';
import { MESSAGE_REPOSITORY } from '@api/message/interfaces/message.repository.interface';
import { MESSAGE_SERVICE } from '@api/message/interfaces/message.service.interface';
import { MessageRepository } from '@api/message/repositories/message.repository';
import { MessageService } from '@api/message/services/message.service';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Message])
    ],
    controllers: [
        MessageController
    ],
    providers: [
        {
            provide: IOTA_SERVICE,
            useClass: IotaService
        },
        {
            provide: MESSAGE_REPOSITORY,
            useClass: MessageRepository
        },
        {
            provide: MESSAGE_SERVICE,
            useClass: MessageService
        }
    ]
})
export class MessageModule { }
