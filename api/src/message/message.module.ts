import { IotaServiceInterface } from '@api/iota/interfaces/iota.service.interface';
import { IotaService } from '@api/iota/services/iota.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotaModule } from '@api/iota/iota.module';

import { MessageController } from '@api/message/controllers/message.controller';
import { Message } from '@api/message/entities/message.entity';
import { MESSAGE_REPOSITORY, MessageRepositoryInterface } from '@api/message/interfaces/message.repository.interface';
import { MESSAGE_SERVICE } from '@api/message/interfaces/message.service.interface';
import { MessageRepository } from '@api/message/repositories/message.repository';
import { MessageService } from '@api/message/services/message.service';

@Module({
    imports: [
        IotaModule,
        TypeOrmModule.forFeature([Message])
    ],
    controllers: [
        MessageController
    ],
    providers: [
        {
            provide: MESSAGE_REPOSITORY,
            useClass: MessageRepository
        },
        {
            provide: MESSAGE_SERVICE,
            inject: [IotaService, MessageRepository],
            useFactory: (iotaService: IotaServiceInterface, messageRepository: MessageRepositoryInterface) =>
                new MessageService(iotaService, messageRepository)
        }
    ]
})
export class MessageModule { }
