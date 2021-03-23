import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IotaModule } from '@api/iota/iota.module';

import { Message } from './entities/message.entity';
import { MessageController } from './controllers/message.controller';
import { MessageRepository } from './repositories/message.repository';
import { MessageService } from './services/message.service';

@Module({
    imports: [
        IotaModule,
        TypeOrmModule.forFeature([Message])
    ],
    exports: [],
    controllers: [
        MessageController
    ],
    providers: [
        {
            provide: 'MessageRepositoryInterface',
            useClass: MessageRepository
        },
        {
            provide: 'MessageServiceInterface',
            useClass: MessageService
        }
    ]
})
export class MessageModule { }
